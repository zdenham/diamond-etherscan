import type { RequestHandler } from '@sveltejs/kit';
import { fetchFacets } from '../../../../../utils/fetchFacets.js';
import { generateDummyContract } from '../../../../../utils/generateDummyContract.js';
import { json } from '@sveltejs/kit';

type Params = any;
type Output = any;

export const POST: RequestHandler<Params, Output> = async ({ request }) => {
	try {
		const body = await request.json();
		const { network, diamondAddress } = body;

		if (!network || !diamondAddress) {
			return json({ msg: 'bad input' });
		}

		const facets = await fetchFacets(diamondAddress, network);
		const contract = generateDummyContract(facets, {
			network,
			diamondAddress
		});

		return json({ contract });
	} catch (e) {
		return json({ msg: e.message });
	}
};
