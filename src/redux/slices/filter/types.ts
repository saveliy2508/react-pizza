export enum SortByTypes {
	POPULAR = 'популярности',
	PRICE = 'цене',
	ALPHABET = 'алфавиту'
}

export interface FilterSliceState {
	category: number
	sortBy: SortByTypes
	page: number
	searchFilter: string
}
