// Obsidian United Developments — Site JS

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function(){
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      links.classList.toggle('mobile-open');
    });
  }
  // mobile dropdown expand
  document.querySelectorAll('.has-dropdown > a').forEach(function(a){
    a.addEventListener('click', function(e){
      if(window.innerWidth <= 980){
        e.preventDefault();
        a.parentElement.classList.toggle('open');
      }
    });
  });

  // Reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    },{threshold:0.12});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('in'); });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click', function(){
      var item = q.parentElement;
      var wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(function(i){
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!wasOpen){
        item.classList.add('open');
        var a = item.querySelector('.faq-a');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Portfolio filter
  var filterBtns = document.querySelectorAll('.filter-btn');
  if(filterBtns.length){
    filterBtns.forEach(function(btn){
      btn.addEventListener('click', function(){
        filterBtns.forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-filter');
        document.querySelectorAll('.work-item').forEach(function(item){
          if(cat === 'all' || item.getAttribute('data-cat') === cat){
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Hero logo video sound toggle
  var soundBtn = document.getElementById('sound-toggle');
  var heroVideo = document.getElementById('hero-logo-video');
  if (soundBtn && heroVideo) {
    soundBtn.addEventListener('click', function(){
      heroVideo.muted = !heroVideo.muted;
      soundBtn.innerHTML = heroVideo.muted ? '&#128264;' : '&#128266;';
      if (!heroVideo.muted) { heroVideo.play(); }
    });
  }

  // Contact page tab switcher (Project Estimate / General Inquiry / Job Application)
  var contactTabs = document.querySelectorAll('.contact-tab');
  if (contactTabs.length) {
    contactTabs.forEach(function(tab){
      tab.addEventListener('click', function(){
        contactTabs.forEach(function(t){ t.classList.remove('active'); });
        tab.classList.add('active');
        document.querySelectorAll('.contact-panel').forEach(function(p){ p.classList.remove('active'); });
        var target = document.getElementById('panel-' + tab.dataset.panel);
        if (target) target.classList.add('active');
      });
    });
  }

  // Web3Forms submission handler — applies to contact form and career application forms
  // Replace YOUR_ACCESS_KEY_HERE in each form's hidden access_key field with a real key from web3forms.com
  document.querySelectorAll('form[id$="-form"]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      var data = new FormData(form);
      var successEl = form.parentElement.querySelector('.form-success') || document.getElementById('form-success');
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function(res){ return res.json(); })
        .then(function(json){
          btn.textContent = originalText;
          btn.disabled = false;
          if(json.success){
            form.reset();
            if(successEl) successEl.style.display = 'block';
          } else {
            alert('Something went wrong. Please call or email us directly.');
          }
        }).catch(function(){
          btn.textContent = originalText;
          btn.disabled = false;
          alert('Something went wrong. Please call or email us directly.');
        });
    });
  });
});
