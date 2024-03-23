import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyPromotionService } from './promos.service';
import { addPromotion } from 'app/core/models/promotion/add-promotion-model';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Component({
    selector: 'promos',
    templateUrl: './promos.component.html',
})
export class PromosComponent implements OnInit {
    addNewsForm: UntypedFormGroup;
    myPromotion: addPromotion[] = [];

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _promotionService: MyPromotionService
    ) {}

    ngOnInit(): void {
        this.getMyPromotion();
    }

    async generatePDFBasic() {
        debugger;

        // Create a new PDFDocument
        const pdfDoc = await PDFDocument.create();

        // Embed the Times Roman font
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

        // Add a blank page to the document
        const page = pdfDoc.addPage();

        // Get the width and height of the page
        const { width, height } = page.getSize();

        // Draw a string of text toward the top of the page
        const fontSize = 30;
        page.drawText('Creating PDFs in JavaScript is awesome!', {
            x: 50,
            y: height - 4 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0.53, 0.71),
        });

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();

        // For example, `pdfBytes` can be:
        //   • Written to a file in Node
        //   • Downloaded from the browser
        //   • Rendered in an <iframe>
        this.saveByteArray('test.pdf', pdfBytes);
    }

    async generatePDFModify() {
        debugger;

        // This should be a Uint8Array or ArrayBuffer
        // This data can be obtained in a number of different ways
        // If your running in a Node environment, you could use fs.readFile()
        // In the browser, you could make a fetch() call and use res.arrayBuffer()
        const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf';
        const existingPdfBytes = await fetch(url).then((res) =>
            res.arrayBuffer()
        );

        // Load a PDFDocument from the existing PDF bytes
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Embed the Helvetica font
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Get the first page of the document
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        // Get the width and height of the first page
        const { width, height } = firstPage.getSize();

        // Draw a string of text diagonally across the first page
        firstPage.drawText('This text was added with JavaScript!', {
            x: 5,
            y: height / 2 + 300,
            size: 50,
            font: helveticaFont,
            color: rgb(0.95, 0.1, 0.1),
            rotate: degrees(-45),
        });

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();

        // For example, `pdfBytes` can be:
        //   • Written to a file in Node
        //   • Downloaded from the browser
        //   • Rendered in an <iframe>
        this.saveByteArray('test1111.pdf', pdfBytes);
    }

    async generatePDFFillForm() {
        debugger;

        // Fetch the PDF with form fields
        const formUrl = 'https://pdf-lib.js.org/assets/dod_character.pdf';
        const formPdfBytes = await fetch(formUrl).then((res) =>
            res.arrayBuffer()
        );

        // Fetch the Mario image
        const marioUrl = 'https://pdf-lib.js.org/assets/small_mario.png';
        const marioImageBytes = await fetch(marioUrl).then((res) =>
            res.arrayBuffer()
        );

        // Fetch the emblem image
        const emblemUrl = 'https://pdf-lib.js.org/assets/mario_emblem.png';
        const emblemImageBytes = await fetch(emblemUrl).then((res) =>
            res.arrayBuffer()
        );

        // Load a PDF with form fields
        const pdfDoc = await PDFDocument.load(formPdfBytes);

        // Embed the Mario and emblem images
        const marioImage = await pdfDoc.embedPng(marioImageBytes);
        const emblemImage = await pdfDoc.embedPng(emblemImageBytes);

        // Get the form containing all the fields
        const form = pdfDoc.getForm();

        // Get all fields in the PDF by their names
        const nameField = form.getTextField('CharacterName 2');
        const ageField = form.getTextField('Age');
        const heightField = form.getTextField('Height');
        const weightField = form.getTextField('Weight');
        const eyesField = form.getTextField('Eyes');
        const skinField = form.getTextField('Skin');
        const hairField = form.getTextField('Hair');

        const alliesField = form.getTextField('Allies');
        const factionField = form.getTextField('FactionName');
        const backstoryField = form.getTextField('Backstory');
        const traitsField = form.getTextField('Feat+Traits');
        const treasureField = form.getTextField('Treasure');

        const characterImageField = form.getButton('CHARACTER IMAGE');
        const factionImageField = form.getButton('Faction Symbol Image');

        // Fill in the basic info fields
        nameField.setText('Mario');
        ageField.setText('24 years');
        heightField.setText(`5' 1"`);
        weightField.setText('196 lbs');
        eyesField.setText('blue');
        skinField.setText('white');
        hairField.setText('brown');

        // Fill the character image field with our Mario image
        characterImageField.setImage(marioImage);

        // Fill in the allies field
        alliesField.setText(
            [
                `Allies:`,
                `  • Princess Daisy`,
                `  • Princess Peach`,
                `  • Rosalina`,
                `  • Geno`,
                `  • Luigi`,
                `  • Donkey Kong`,
                `  • Yoshi`,
                `  • Diddy Kong`,
                ``,
                `Organizations:`,
                `  • Italian Plumbers Association`,
            ].join('\n')
        );

        // Fill in the faction name field
        factionField.setText(`Mario's Emblem`);

        // Fill the faction image field with our emblem image
        factionImageField.setImage(emblemImage);

        // Fill in the backstory field
        backstoryField.setText(
            `Mario is a fictional character in the Mario video game franchise, owned by Nintendo and created by Japanese video game designer Shigeru Miyamoto. Serving as the company's mascot and the eponymous protagonist of the series, Mario has appeared in over 200 video games since his creation. Depicted as a short, pudgy, Italian plumber who resides in the Mushroom Kingdom, his adventures generally center upon rescuing Princess Peach from the Koopa villain Bowser. His younger brother and sidekick is Luigi.`
        );

        // Fill in the traits field
        traitsField.setText(
            [
                `Mario can use three basic three power-ups:`,
                `  • the Super Mushroom, which causes Mario to grow larger`,
                `  • the Fire Flower, which allows Mario to throw fireballs`,
                `  • the Starman, which gives Mario temporary invincibility`,
            ].join('\n')
        );

        // Fill in the treasure field
        treasureField.setText(['• Gold coins', '• Treasure chests'].join('\n'));

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();

        this.saveByteArray('test1111.pdf', pdfBytes);
    }

    saveByteArray(reportName, byte) {
        debugger;

        var blob = new Blob([byte], { type: 'application/pdf' });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();
    }

    addPromo() {
        this._router.navigate(['/pages/add-promotion/new']);
    }

    getMyPromotion(): void {
        this._promotionService.getMyPromotions().subscribe(
            (response: addPromotion[]) => {
                this.myPromotion = response;
            },
            (response) => {
                this.myPromotion = [];
            }
        );
    }

    goEditPromotion(promo: addPromotion) {
        this._router.navigate(['/pages/add-promotion', promo.id]);
    }
}
