'use strict';

window.onload = function () {
    var $btn = document.querySelector('download-pdf button');
    $btn.addEventListener('click', function () {
        var $invoice = this.dataset.invoice;
        var pdf = new jsPDF('a', 'mm', 'letter');
        var firstPage = 0;

        var $page = document.querySelector('[page-pdf]');
        console.log($page);

        html2canvas($page, {
            onrendered: function onrendered(canvas) {
                firstPage = canvas.toDataURL('image/jpeg', 1.0);
                pdf.addImage(firstPage, 'JPEG', 0, 0, 216, 0);

                var blob = pdf.output('blob');

                var data = new FormData();
                data.append('pdf', blob);

                fetch('url', {
                    method: 'POST',
                    body: data
                }).then(function ($r) {
                    return $r.json();
                }).catch(function ($r) {
                    return console.log($r);
                }).then(function ($r) {
                    if ($r.status == 'OK') {
                        pdf.save($r.name);
                    }
                });
            }
        });
    });
};

// <?php
// move_uploaded_file(
//     $_FILES['pdf']['tmp_name'], 
//     $_SERVER['DOCUMENT_ROOT'] . "/uploads/test.pdf"
// );
// ?>