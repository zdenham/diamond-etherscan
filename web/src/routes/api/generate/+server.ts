import type { RequestHandler } from '@sveltejs/kit';
import { fetchFacets } from '../../../../../utils/fetchFacets.js';
import { generateDummyContract } from '../../../../../utils/generateDummyContract.js';
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

type Params = any;
type Output = any;

export const POST: RequestHandler<Params, Output> = async ({ request }) => {
	try {
		const body = await request.json();
		const { network, diamondAddress } = body;

		if (!network || !diamondAddress) {
			throw error(400, 'bad input');
		}

		const facets = await fetchFacets(diamondAddress, network);
		const contract = generateDummyContract(facets, {
			network,
			diamondAddress
		});

		return json({ contract });
	} catch (e) {
		console.log('THE FULL ERROR', e);
		throw error(500, e.message);
	}
};
