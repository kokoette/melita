import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name:'firstWord',
  standalone: true
})
export class FirstWordPipe implements PipeTransform {
  transform(sentence: string):string {
    if (!sentence) return '';
    return sentence.split(' ')[0];
  }
}
