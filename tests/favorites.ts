import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";
import { PublicKey } from "@solana/web3.js";

describe("favorites", () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    // HARDCODE THE DEPLOYED PROGRAM ID
    const PROGRAM_ID = new PublicKey("HthP1rPekRR4Vrgs5TZxiK7zQiF73bZ3ZewpJwk4jYLv");
    const program = new Program<Favorites>(
        require("../target/idl/favorites.json"),
        PROGRAM_ID,
        provider
    );

    it("Is initialized!", async () => {
        const user = provider.wallet.publicKey;

        const [favoritesPda] = PublicKey.findProgramAddressSync(
            [Buffer.from("favorites"), user.toBuffer()],
            PROGRAM_ID
        );

        const tx = await program.methods
            .setFavorites(
                new anchor.BN(42),
                "blue",
                ["reading", "gaming", "walking"]
            )
            .accounts({
                user,
                favorites: favoritesPda,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .rpc();

        console.log("Transaction signature:", tx);
        console.log("View:", `https://explorer.solana.com/tx/${tx}?cluster=devnet`);

        const account = await program.account.favorites.fetch(favoritesPda);
        console.log("Favorites:", account);
    });
});
