import { renderToStaticMarkup } from 'react-dom/server';
import pdf from 'html-pdf';

const router = require('express-router');
const axios = require('axios');


let Asset = require('../models/asset');

router.route('/assetpdf').get((req, res) => {

  const componentToPDFBuffer = (component) => {
    return new Promise((resolve, reject) => {
      const html = renderToStaticMarkup(component);
  
      const options = {
        format: 'A4',
        orientation: 'portrait',
        border: '10mm',
        footer: {
          height: '10mm',
        },
        type: 'pdf',
        timeout: 30000,
      };
  
      const buffer = pdf.create(html, options).toBuffer((err, buffer) => {
        if (err) {
          return reject(err);
        }
      
        return resolve(buffer);
      });
    });
  }
}
)

