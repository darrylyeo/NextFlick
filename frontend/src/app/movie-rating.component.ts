import { Component, Input } from '@angular/core'

@Component({
	selector: 'nextflick-movie-rating',
	templateUrl: './movie-rating.component.html',
	styleUrls: ['./movie-rating.component.css']
})
export class MovieRatingComponent {
	@Input() rating: number
	@Input() showDescription: boolean = false
	
	get emoji(){
	    return {
			'-5': '🤪',
			'-4': '😜',
			'-3': '😛',
			'-2': '😏',
			'-1': '🙄',
			'0': '😴',
			'1': '😕',
			'2': '😐',
			'3': '🙂',
			'4': '😃',
			'5': '🤩'
		}[this.rating]
	}
	
	get description(){
		return {
			'-5': 'Absolutely, ironically, spectacularly cringeworthy!',
			'-4': 'Notoriously, hilariously terrible.',
			'-3': 'Horrible but actually quite intriguing.',
			'-2': 'Mildly entertaining because it\'s bad.',
			'-1': 'Cheesy or offputting.',
			'0': 'There\'s nothing much to see.',
			'1': 'Boring or confusing.',
			'2': 'Could take it or leave it.',
			'3': 'Pretty entertaining. Might watch again.',
			'4': 'Would definitely see again.',
			'5': 'Spot on! An absolute must-see for everyone!'
		}[this.rating]
	}
}