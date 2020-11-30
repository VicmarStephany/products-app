import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidateService } from 'src/app/services/validate/validate.service';

/**Custom validator
 * @description Validates the type of the image uploaded
 * @param photoControl : FormControl
 */
export function image(): ValidatorFn {
    return (photoControl: AbstractControl): { [key: string]: boolean } | null =>{
        let validateService: ValidateService;
        if (photoControl.value) {
            const [image] = photoControl.value.files;
            return validateService.validateFile(image)
                ? null
                : {
                    image: true,
                };
        }
        return;
    }
}
