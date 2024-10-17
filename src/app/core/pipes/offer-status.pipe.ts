import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'offerStatus',
    standalone: true
})
export class OfferStatusPipe implements PipeTransform {
    transform(offer: { contractEndDate: string }): string | number {
        const currentDate = new Date();
        const endDate = new Date(offer.contractEndDate);

        if (currentDate > endDate) {
            return "Expired"; // Offer has expired
        } else {
            const timeDiff = endDate.getTime() - currentDate.getTime();
            const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert ms to days
            return daysRemaining; // Return the number of days remaining
        }
    }
}
