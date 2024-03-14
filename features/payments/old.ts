


// async function writeNfcTag(value: any) {
//     try {
//       // Ensure NFC is supported and enabled
//       await NfcManager.isSupported();
//       await NfcManager.start();

//       // Prepare the message to be written
//       const bytes = Ndef.encodeMessage([Ndef.textRecord(value)]);

//       // Write to the tag
//       await NfcManager.requestTechnology(NfcTech.Ndef);
//       const tag = await NfcManager.getTag();
//       await NfcManager.ndefHandler.writeNdefMessage(bytes);

//       console.log("Successfully written to NFC tag:", tag);
//     } catch (e) {
//       console.warn("Failed to write NFC tag:", e);
//     } finally {
//       // Clean up NFC manager resources
//       NfcManager.cancelTechnologyRequest().catch(() => 0);
//     }
//   }

//   async function readNfcData(tag: any) {
//     try {
//       const ndefRecords = tag.ndefMessage;
//       let tagData = "";
//       if (ndefRecords && ndefRecords.length > 0) {
//         // Assuming the text is in the first record
//         tagData = Ndef.text.decodePayload(ndefRecords[0].payload);
//       }

//       console.log("NFC Tag Data:", tagData);
//     } catch (e) {
//       console.warn("Failed to read NFC tag:", e);
//     }
//   }


// const handleCobrarOld = async () => {
//     setShowModal(true);
//     setIsWriting(true);
//     try {
//       await writeNfcTag("This is your birthday!");
//     } catch (error) {
//     } finally {
//       setIsWriting(false);
//       setShowModal(false);
//     }
//   };