const selfsigned = require('selfsigned');
const fs = require('fs');

// Atributos del certificado
const attributes = [{ name: 'commonName', value: 'localhost' }];
const options = { days: 365 };

try {
    // Generar el certificado
    const pems = selfsigned.generate(attributes, options);

    // Escribir los archivos
    fs.writeFileSync('key.pem', pems.private, 'utf-8');
    fs.writeFileSync('cert.pem', pems.cert, 'utf-8');

    console.log('Certificado y clave generados con éxito: key.pem y cert.pem');
} catch (error) {
    console.error('Error al generar el certificado:', error);
}
