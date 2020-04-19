//页面id
class PageID {
	id: number;

	constructor () {
		this.id = 0;
	}

	setCurrentID (): void {
		++this.id;
	}

	getCurrentID (): number {
		return this.id;
	}

	isCurrentID ( id: number ): boolean {
		return this.id === id;
	}
}

export default PageID;