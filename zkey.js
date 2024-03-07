const snarkjs = require("snarkjs");
const fs = require("fs");

const zkey = async (circuit) => {
    await snarkjs.zKey.newZKey(`./compile/${circuit}.r1cs`, "./zkey/powersOfTau28_hez_final_08.ptau", `./zkey/${circuit}_00.zkey`);

    await snarkjs.zKey.contribute(`./zkey/${circuit}_00.zkey`,`./zkey/${circuit}_01.zkey`,'contribute','contribute');

    await snarkjs.zKey.beacon(`./zkey/${circuit}_01.zkey`,`./zkey/${circuit}_final.zkey`,'beacon','0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f',10);

    await snarkjs.zKey.verifyFromR1cs(`./compile/${circuit}.r1cs`,"./zkey/powersOfTau28_hez_final_08.ptau",`./zkey/${circuit}_final.zkey`);

    const vk = await snarkjs.zKey.exportVerificationKey(`./zkey/${circuit}_final.zkey`)

    fs.writeFileSync(`./zkey/${circuit}_verification_key.json`, JSON.stringify(vk))

    return circuit;
};

zkey('circuit').then((circuit) => {
    process.exit(0)
});