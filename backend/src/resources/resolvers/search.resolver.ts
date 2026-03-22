import { Resolver, Query, Args } from "@nestjs/graphql";
import { SearchService, SearchResult } from "../services/search.service";
import { SearchResultType } from "src/graphql/types/search.type";

@Resolver()
export class SearchResolver {
	constructor(private readonly searchService: SearchService) {}

	@Query(() => [SearchResultType])
	async search(@Args("query") query: string): Promise<SearchResult[]> {
		return this.searchService.search(query);
	}
}
