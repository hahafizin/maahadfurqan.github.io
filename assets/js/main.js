/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Touch mode.
	if (browser.mobile)
		$body.addClass('is-touch');

	// Scrolly links.
	$('.scrolly').scrolly({
		speed: 2000
	});

	// Dropdowns.
	$('#nav > ul').dropotron({
		alignment: 'right',
		hideDelay: 350
	});

	// Nav.

	// Title Bar.
	$(
		'<div id="titleBar">' +
		'<a href="#navPanel" class="toggle"></a>' +
		'<span class="title">' + $('#logo').html() + '</span>' +
		'</div>'
	)
		.appendTo($body);

	// Panel.
	$(
		'<div id="navPanel">' +
		'<nav>' +
		$('#nav').navList() +
		'</nav>' +
		'</div>'
	)
		.appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'left',
			target: $body,
			visibleClass: 'navPanel-visible'
		});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
	if (browser.name == 'ie'
		|| browser.mobile) {

		$.fn._parallax = function () {

			return $(this);

		};

	}
	else {

		$.fn._parallax = function () {

			$(this).each(function () {

				var $this = $(this),
					on, off;

				on = function () {

					$this
						.css('background-position', 'center 0px');

					$window
						.on('scroll._parallax', function () {

							var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

							$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

						});

				};

				off = function () {

					$this
						.css('background-position', '');

					$window
						.off('scroll._parallax');

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

			return $(this);

		};

		$window
			.on('load resize', function () {
				$window.trigger('scroll');
			});

	}

	// Spotlights.
	var $spotlights = $('.spotlight');

	$spotlights
		._parallax()
		.each(function () {

			var $this = $(this),
				on, off;

			on = function () {

				var top, bottom, mode;

				// Use main <img>'s src as this spotlight's background.
				$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

				// Side-specific scrollex tweaks.
				if ($this.hasClass('top')) {

					mode = 'top';
					top = '-20%';
					bottom = 0;

				}
				else if ($this.hasClass('bottom')) {

					mode = 'bottom-only';
					top = 0;
					bottom = '20%';

				}
				else {

					mode = 'middle';
					top = 0;
					bottom = 0;

				}

				// Add scrollex.
				$this.scrollex({
					mode: mode,
					top: top,
					bottom: bottom,
					initialize: function (t) { $this.addClass('inactive'); },
					terminate: function (t) { $this.removeClass('inactive'); },
					enter: function (t) { $this.removeClass('inactive'); },

					// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

					//leave:	function(t) { $this.addClass('inactive'); },

				});

			};

			off = function () {

				// Clear spotlight's background.
				$this.css('background-image', '');

				// Remove scrollex.
				$this.unscrollex();

			};

			breakpoints.on('<=medium', off);
			breakpoints.on('>medium', on);

		});

	// Wrappers.
	var $wrappers = $('.wrapper');

	$wrappers
		.each(function () {

			var $this = $(this),
				on, off;

			on = function () {

				$this.scrollex({
					top: 250,
					bottom: 0,
					initialize: function (t) { $this.addClass('inactive'); },
					terminate: function (t) { $this.removeClass('inactive'); },
					enter: function (t) { $this.removeClass('inactive'); },

					// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

					//leave:	function(t) { $this.addClass('inactive'); },

				});

			};

			off = function () {
				$this.unscrollex();
			};

			breakpoints.on('<=medium', off);
			breakpoints.on('>medium', on);

		});

	// Banner.
	var $banner = $('#banner');

	$banner
		._parallax();

	// status pejabat
	function checkStatusPejabat() {
		const now = new Date();
		const hari = now.getDay(); // Ahad = 0, Isnin = 1, ..., Sabtu = 6
		const jam = now.getHours();
		const minit = now.getMinutes();
		const totalMinit = jam * 60 + minit;

		const bukaMinit = 7 * 60 + 30; // 7:30 AM
		const tutupMinit = 16 * 60;    // 4:00 PM

		const statusEl = document.getElementById("status");

		if (hari >= 1 && hari <= 5 && totalMinit >= bukaMinit && totalMinit <= tutupMinit) {
			statusEl.textContent = "✅ Pejabat Dibuka";
			statusEl.className = "buka";
		} else {
			statusEl.textContent = "❌ Pejabat Ditutup";
			statusEl.className = "tutup";
		}
	}

	checkStatusPejabat();
	setInterval(checkStatusPejabat, 60000);

	const year = new Date().getFullYear();
	document.getElementById("current-year").textContent = year;

	//fetch sumbangan dari script dari sheet dari forms
	const target = {
		pondok: 179000,
		pengurusan: 200000,
		dataran: 90000,
		baikpulih: 100000
	  };
	  
	  function kiraPercent(current, goal) {
		return Math.min((current / goal) * 100, 100).toFixed(1);
	  }
	  
	  fetch("https://script.google.com/macros/s/AKfycby35ww7VnCo1ScuKBg5VNd23AUS2g3vsMKUKTMtuUvVB0-udHnhI9_wwOKlajOtnzE-/exec")
		.then(res => res.json())
		.then(data => {
		  const pondokPercent = kiraPercent(data.pondok, target.pondok);
		  const pengurusanPercent = kiraPercent(data.pengurusan, target.pengurusan);
		  const dataranPercent = kiraPercent(data.dataran, target.dataran);
		  const baikpulihPercent = kiraPercent(data.baikpulih, target.baikpulih);
	  
		  document.getElementById("pondok").innerHTML = `
			<p>Terkumpul : RM ${data.pondok.toLocaleString("ms-MY")} / RM ${target.pondok.toLocaleString("ms-MY")} (${pondokPercent}% terkumpul)</p>
			<div class="progress">
			  <div class="progress-bar" style="width: ${pondokPercent}%;"></div>
			</div>
		  `;
	  
		  document.getElementById("pengurusan").innerHTML = `
			<p>Terkumpul : RM ${data.pengurusan.toLocaleString("ms-MY")} / RM ${target.pengurusan.toLocaleString("ms-MY")} (${pengurusanPercent}% terkumpul)</p>
			<div class="progress">
			  <div class="progress-bar" style="width: ${pengurusanPercent}%;"></div>
			</div>
		  `;
	  
		  document.getElementById("dataran").innerHTML = `
			<p>Terkumpul : RM ${data.dataran.toLocaleString("ms-MY")} / RM ${target.dataran.toLocaleString("ms-MY")} (${dataranPercent}% terkumpul)</p>
			<div class="progress">
			  <div class="progress-bar" style="width: ${dataranPercent}%;"></div>
			</div>
		  `;

		  document.getElementById("baikpulih").innerHTML = `
			<p>Terkumpul : RM ${data.baikpulih.toLocaleString("ms-MY")} / RM ${target.baikpulih.toLocaleString("ms-MY")} (${baikpulihPercent}% terkumpul)</p>
			<div class="progress">
			  <div class="progress-bar" style="width: ${baikpulihPercent}%;"></div>
			</div>
		  `;
	  
		  document.getElementById("last-update").innerHTML = `
			<p>Nilai sumbangan berikut terakhir dikemaskini pada ${new Date(data.last_update).toLocaleString("ms-MY")}.</p>
		  `;
		})
		.catch(err => {
		  document.getElementById("sumbangan-container").innerHTML = "Tak dapat ambil data 😢";
		  console.error("Error:", err);
		});

	//fetch value transaction dari toyyibpay
	const API_URL = 'https://script.google.com/macros/s/AKfycbzRHQW7eD2COJ7lnvYic6-5zYcaoEE5DifUe-qRw7ZXYxnAFsBmbOkuYO8bojqXSZs9/exec';

	//kumpulkan multiple billcode dalam satu table
	const billGroups = {
		table1: ["Sedekah-Jumaat-MATAF", "Pakej-Wakaf-Perak-MATAF"],
		table2: ["Pakej-Wakaf-Gangsa-MATAF"],
		table3: ["Pakej-Wakaf-Biasa-MATAF"],
		table4: ["Saham-Akhirat-1-Keluarga-RM-10", "Sumbangan-RM-2"]
	  };

	fetch(API_URL)
		.then(response => response.json())
		.then(data => {
			Object.entries(billGroups).forEach(([tableId, billCodeArray]) => {
				const combined = [];

				billCodeArray.forEach(code => {
					if (data[code]) {
						combined.push(...data[code]);
					}
				});

				const sorted = combined.sort((a, b) => parseFloat(b.billpaymentAmount) - parseFloat(a.billpaymentAmount));
				const topFive = sorted.slice(0, 5);

				const tbody = document.getElementById(`${tableId}Body`);
				const loadingDiv = document.getElementById(`${tableId}Loading`);
				loadingDiv.textContent = ''; // Clear "Loading..."

				topFive.forEach((item, index) => {
					const row = document.createElement('tr');

					const ranking = document.createElement('td');
					ranking.textContent = index + 1;

					const nama = document.createElement('td');
					nama.textContent = item.billTo;

					const nilai = document.createElement('td');
					nilai.textContent = parseFloat(item.billpaymentAmount).toFixed(2);

					row.appendChild(ranking);
					row.appendChild(nama);
					row.appendChild(nilai);

					tbody.appendChild(row);
				});
			});
		})
		.catch(err => {
			console.error('Fetch error:', err);
			// Kalau error, semua table loading jadi error
			Object.keys(billGroups).forEach(tableId => {
				const loadingDiv = document.getElementById(`${tableId}Loading`);
				loadingDiv.textContent = 'Error loading data 😢';
			});
		});





})(jQuery);