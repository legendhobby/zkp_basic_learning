const snarkjs = require("snarkjs");
const fs = require("fs");

async function proof() {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve({a: 10, b: 21}, "./compile/circuit.wasm", "./zkey/circuit_final.zkey");

    fs.writeFileSync("./proof/proof.json",JSON.stringify(proof))
    fs.writeFileSync("./proof/publicInputSignals.json",JSON.stringify(publicSignals))

}

proof().then(() => {
    process.exit(0);
});