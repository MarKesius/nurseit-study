document.addEventListener('DOMContentLoaded', () => {
  const qaContainer = document.getElementById('qa');

  fetch('OMADA_A_Apantiseis.md')
    .then(resp => resp.text())
    .then(md => {
      // Split into blocks by ---
      const blocks = md.split(/\n---+\n/).map(b => b.trim()).filter(Boolean);

      blocks.forEach((block, idx) => {
        // Extract question: text between first ** ... **
        const questionMatch = block.match(/\*\*(.+?)\*\*/s);
        if (!questionMatch) return;

        const question = questionMatch[1].trim();

        // Answer: everything after the first **...**
        const afterQuestion = block.slice(block.indexOf(questionMatch[0]) + questionMatch[0].length).trim();

        const item = document.createElement('div');
        item.className = 'item';

        const q = document.createElement('div');
        q.className = 'question';
        q.innerHTML = `<span class="q-number">${idx + 1}.</span> ${question}`;
        q.setAttribute('role', 'button');
        q.setAttribute('tabindex', '0');

        const a = document.createElement('div');
        a.className = 'answer';
        // Render newlines as <br>, keep basic markdown bold
        a.innerHTML = afterQuestion
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\n/g, '<br>');

        item.appendChild(q);
        item.appendChild(a);
        qaContainer.appendChild(item);

        // Click to toggle
        q.addEventListener('click', () => {
          item.classList.toggle('active');
        });
        // Keyboard support
        q.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.classList.toggle('active');
          }
        });
      });

      if (qaContainer.children.length === 0) {
        qaContainer.innerHTML = '<p class="error">Δεν βρέθηκε περιεχόμενο.</p>';
      }
    })
    .catch(err => {
      qaContainer.innerHTML = '<p class="error">Αποτυχία φόρτωσης αρχείου.</p>';
      console.error(err);
    });
});
