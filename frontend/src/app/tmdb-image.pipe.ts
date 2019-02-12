import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'tmdbImage'})
export class TmdbImagePipe implements PipeTransform {
    transform(imagePath: string, width: number = 200): string {
        console.log('tmdbImage', imagePath ? `https://image.tmdb.org/t/p/w${width}/${imagePath}` : '')
        return imagePath ? `https://image.tmdb.org/t/p/w${width}/${imagePath}` : ''
    }
}