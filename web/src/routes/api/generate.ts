import type { RequestHandler } from '@sveltejs/kit';
import { fetchFacets } from '../../../../utils/fetchFacets';
import { generateDummyContract } from '../../../../utils/generateDummyContract';

type Params = any;
type Output = any;

export const post: RequestHandler<Params, Output> = async ({ request }) => {
	const body = await request.json();
	const { network, diamondAddress } = body;

	if (!network || !diamondAddress) {
		return {
			status: 400,
			body: {
				msg: 'invalid request'
			}
		};
	}

	const facets = await fetchFacets(diamondAddress, network);
	const contract = generateDummyContract(facets, {
		network,
		diamondAddress
	});

	return {
		status: 200,
		body: {
			contract
		}
	};
};
