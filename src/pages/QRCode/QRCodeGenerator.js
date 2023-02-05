import React from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = ({ id }) => {
  return (
    <div>
      <QRCode id="qrCode" size={200} value={id} />
    </div>
  );
};

export default QRCodeGenerator;
