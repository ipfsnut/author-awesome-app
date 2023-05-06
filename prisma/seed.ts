import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const books = [
	{
		title: 'For Goodness Sake',
		coverUrl:
			'https://dl.openseauserdata.com/cache/originImage/files/7653110c1e9ce81a3d97c401660b00f8.png',
		AuthorName: 'T. Dylan Daniel',
		metadata:
			'https://ipfs.nftbookbazaar.com/ipfs/Qmc9W5c5Bh5nEXHv36Tpj8ST8ZcSGV8dv5f1ud6FDLPxTj',
		externalUrl:
			'https://ipfs.nftbookbazaar.com/ipfs/QmW6Etekv5bqgGe4uCkCP2qj1oamJd4xMqHw3B6eD2mwAa',
		authorId: 0,
	},
	{
		title: 'Vagobond Magazine Issue 2.5',
		coverUrl:
			'https://dl.openseauserdata.com/cache/originImage/files/99b4e5ba51675b63f7163d31cd615c18.jpg',
		AuthorName: 'CD Vagobond & Vagobond Magazine Team',
		metadata:
			'https://ipfs.nftbookbazaar.com/ipfs/QmV2p9VGSc6Z2cWWbRSKysiRBCJ6AeYEpLnTPpERLNHLSN',
		externalUrl:
			'https://ipfs.nftbookbazaar.com/ipfs/QmdieqF2CJioGuf95V7escBB77J8ue31vQCSJpmDFkuQDw',
		authorId: 1,
	},
	{
		title: 'Peace of Mind',
		coverUrl:
			'https://dl.openseauserdata.com/cache/originImage/files/bd369cf9c9f578111e4f271c5fc038ca.png',
		AuthorName: 'Robbie Pollock',
		metadata:
			'https://ipfs.nftbookbazaar.com/ipfs/QmTLNxigdUfbNieL8ZMEt7HiGnWWXTJDoKGE4SbFRc4LMz',
		externalUrl:
			'https://ipfs.nftbookbazaar.com/ipfs/QmckRLxAWa1hDDAFzBWEAvqYZc1jpCTvyGNuFkBqTmeKV8/',
		authorId: 2,
	},
];

async function main() {
	for (const book of books) {
		await prisma.book.create({
			data: book,
		});
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
