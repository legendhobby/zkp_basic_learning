const snarkjs = require("snarkjs");
const fs = require("fs");

async function verify(circuit) {
    const vKey = JSON.parse(fs.readFileSync(`./zkey/${circuit}_verification_key.json`));
    const proof = JSON.parse(fs.readFileSync('./proof/proof.json'));
    const publicSignals = JSON.parse(fs.readFileSync('./proof/publicInputSignals.json'));

    const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    if (res === true) {
        console.log("verify successfully");
    } else {
        console.log("verify fail");
    }

}

verify('circuit').then(() => {
    process.exit(0);
});