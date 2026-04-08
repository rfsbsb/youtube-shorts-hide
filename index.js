function waitFor(selectorFn, timeout = 3000) {
  const start = Date.now();
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const el = selectorFn();
      if (el) {
        clearInterval(interval);
        resolve(el);
      } else if (Date.now() - start > timeout) {
        clearInterval(interval);
        resolve(null);
      }
    }, 100);
  });
}

async function hideShorts() {
  const shorts = [...document.querySelectorAll('ytm-shorts-lockup-view-model-v2')];
  console.log(`Found ${shorts.length} shorts to hide`);

  let hidden = 0;
  let skipped = 0;

  for (let i = 0; i < shorts.length; i++) {
    const container = shorts[i];
    const menuBtn = container.querySelector('.shortsLockupViewModelHostOutsideMetadataMenu button');

    if (!menuBtn) {
      console.log(`Short ${i}: no menu button, skipping`);
      skipped++;
      continue;
    }

    menuBtn.click();

    const hideBtn = await waitFor(() => {
      const sheet = document.querySelector('.ytContextualSheetLayoutContentContainer');
      if (!sheet) return null;
      const spans = [...sheet.querySelectorAll('.ytListItemViewModelTitle')];
      const hideSpan = spans.find(s => {
        const text = s.textContent.toLowerCase().trim();
        return text === 'hide';
      });
      if (!hideSpan) return null;
      return hideSpan.closest('yt-list-item-view-model') || hideSpan;
    });

    if (hideBtn) {
      hideBtn.click();
      hidden++;
      console.log(`Short ${i}: hidden successfully`);
      await new Promise(r => setTimeout(r, 300));
    } else {
      console.log(`Short ${i}: hide button not found, closing menu`);
      document.body.click();
      await new Promise(r => setTimeout(r, 200));
      skipped++;
    }
  }

  console.log(`Done! Hidden: ${hidden}, Skipped: ${skipped}`);
}

hideShorts();
