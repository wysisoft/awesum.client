import type { ValidationRuleWithParams } from "@vuelidate/core";


export class validatedValue {
    required?:ValidationRuleWithParams
    maxLength?:ValidationRuleWithParams
    matchesRegex?:ValidationRuleWithParams
}