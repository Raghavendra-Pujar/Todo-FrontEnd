import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;

  public mobileNumber: any;
  public email: any;
  public password: any;
  public confirmPassword: any;
  public country : any;
  public countryCodes: any = [{ "code": "BD", "name": "Bangladesh", "isd": "880" }, { "code": "BE", "name": "Belgium", "isd": "32" }, { "code": "BF", "name": "Burkina Faso", "isd": "226" }, { "code": "BG", "name": "Bulgaria", "isd": "359" }, { "code": "BA", "name": "Bosnia and Herzegovina", "isd": "387" }, { "code": "BB", "name": "Barbados", "isd": "+1-246" }, { "code": "WF", "name": "Wallis and Futuna", "isd": "681" }, { "code": "BL", "name": "Saint Barthelemy", "isd": "590" }, { "code": "BM", "name": "Bermuda", "isd": "+1-441" }, { "code": "BN", "name": "Brunei", "isd": "673" }, { "code": "BO", "name": "Bolivia", "isd": "591" }, { "code": "BH", "name": "Bahrain", "isd": "973" }, { "code": "BI", "name": "Burundi", "isd": "257" }, { "code": "BJ", "name": "Benin", "isd": "229" }, { "code": "BT", "name": "Bhutan", "isd": "975" }, { "code": "JM", "name": "Jamaica", "isd": "+1-876" }, { "code": "BV", "name": "Bouvet Island", "isd": "" }, { "code": "BW", "name": "Botswana", "isd": "267" }, { "code": "WS", "name": "Samoa", "isd": "685" }, { "code": "BQ", "name": "Bonaire, Saint Eustatius and Saba ", "isd": "599" }, { "code": "BR", "name": "Brazil", "isd": "55" }, { "code": "BS", "name": "Bahamas", "isd": "+1-242" }, { "code": "JE", "name": "Jersey", "isd": "+44-1534" }, { "code": "BY", "name": "Belarus", "isd": "375" }, { "code": "BZ", "name": "Belize", "isd": "501" }, { "code": "RU", "name": "Russia", "isd": "7" }, { "code": "RW", "name": "Rwanda", "isd": "250" }, { "code": "RS", "name": "Serbia", "isd": "381" }, { "code": "TL", "name": "East Timor", "isd": "670" }, { "code": "RE", "name": "Reunion", "isd": "262" }, { "code": "TM", "name": "Turkmenistan", "isd": "993" }, { "code": "TJ", "name": "Tajikistan", "isd": "992" }, { "code": "RO", "name": "Romania", "isd": "40" }, { "code": "TK", "name": "Tokelau", "isd": "690" }, { "code": "GW", "name": "Guinea-Bissau", "isd": "245" }, { "code": "GU", "name": "Guam", "isd": "+1-671" }, { "code": "GT", "name": "Guatemala", "isd": "502" }, { "code": "GS", "name": "South Georgia and the South Sandwich Islands", "isd": "" }, { "code": "GR", "name": "Greece", "isd": "30" }, { "code": "GQ", "name": "Equatorial Guinea", "isd": "240" }, { "code": "GP", "name": "Guadeloupe", "isd": "590" }, { "code": "JP", "name": "Japan", "isd": "81" }, { "code": "GY", "name": "Guyana", "isd": "592" }, { "code": "GG", "name": "Guernsey", "isd": "+44-1481" }, { "code": "GF", "name": "French Guiana", "isd": "594" }, { "code": "GE", "name": "Georgia", "isd": "995" }, { "code": "GD", "name": "Grenada", "isd": "+1-473" }, { "code": "GB", "name": "United Kingdom", "isd": "44" }, { "code": "GA", "name": "Gabon", "isd": "241" }, { "code": "SV", "name": "El Salvador", "isd": "503" }, { "code": "GN", "name": "Guinea", "isd": "224" }, { "code": "GM", "name": "Gambia", "isd": "220" }, { "code": "GL", "name": "Greenland", "isd": "299" }, { "code": "GI", "name": "Gibraltar", "isd": "350" }, { "code": "GH", "name": "Ghana", "isd": "233" }, { "code": "OM", "name": "Oman", "isd": "968" }, { "code": "TN", "name": "Tunisia", "isd": "216" }, { "code": "JO", "name": "Jordan", "isd": "962" }, { "code": "HR", "name": "Croatia", "isd": "385" }, { "code": "HT", "name": "Haiti", "isd": "509" }, { "code": "HU", "name": "Hungary", "isd": "36" }, { "code": "HK", "name": "Hong Kong", "isd": "852" }, { "code": "HN", "name": "Honduras", "isd": "504" }, { "code": "HM", "name": "Heard Island and McDonald Islands", "isd": " " }, { "code": "VE", "name": "Venezuela", "isd": "58" }, { "code": "PR", "name": "Puerto Rico", "isd": "+1-787 and 1-939" }, { "code": "PS", "name": "Palestinian Territory", "isd": "970" }, { "code": "PW", "name": "Palau", "isd": "680" }, { "code": "PT", "name": "Portugal", "isd": "351" }, { "code": "SJ", "name": "Svalbard and Jan Mayen", "isd": "47" }, { "code": "PY", "name": "Paraguay", "isd": "595" }, { "code": "IQ", "name": "Iraq", "isd": "964" }, { "code": "PA", "name": "Panama", "isd": "507" }, { "code": "PF", "name": "French Polynesia", "isd": "689" }, { "code": "PG", "name": "Papua New Guinea", "isd": "675" }, { "code": "PE", "name": "Peru", "isd": "51" }, { "code": "PK", "name": "Pakistan", "isd": "92" }, { "code": "PH", "name": "Philippines", "isd": "63" }, { "code": "PN", "name": "Pitcairn", "isd": "870" }, { "code": "PL", "name": "Poland", "isd": "48" }, { "code": "PM", "name": "Saint Pierre and Miquelon", "isd": "508" }, { "code": "ZM", "name": "Zambia", "isd": "260" }, { "code": "EH", "name": "Western Sahara", "isd": "212" }, { "code": "EE", "name": "Estonia", "isd": "372" }, { "code": "EG", "name": "Egypt", "isd": "20" }, { "code": "ZA", "name": "South Africa", "isd": "27" }, { "code": "EC", "name": "Ecuador", "isd": "593" }, { "code": "IT", "name": "Italy", "isd": "39" }, { "code": "VN", "name": "Vietnam", "isd": "84" }, { "code": "SB", "name": "Solomon Islands", "isd": "677" }, { "code": "ET", "name": "Ethiopia", "isd": "251" }, { "code": "SO", "name": "Somalia", "isd": "252" }, { "code": "ZW", "name": "Zimbabwe", "isd": "263" }, { "code": "SA", "name": "Saudi Arabia", "isd": "966" }, { "code": "ES", "name": "Spain", "isd": "34" }, { "code": "ER", "name": "Eritrea", "isd": "291" }, { "code": "ME", "name": "Montenegro", "isd": "382" }, { "code": "MD", "name": "Moldova", "isd": "373" }, { "code": "MG", "name": "Madagascar", "isd": "261" }, { "code": "MF", "name": "Saint Martin", "isd": "590" }, { "code": "MA", "name": "Morocco", "isd": "212" }, { "code": "MC", "name": "Monaco", "isd": "377" }, { "code": "UZ", "name": "Uzbekistan", "isd": "998" }, { "code": "MM", "name": "Myanmar", "isd": "95" }, { "code": "ML", "name": "Mali", "isd": "223" }, { "code": "MO", "name": "Macao", "isd": "853" }, { "code": "MN", "name": "Mongolia", "isd": "976" }, { "code": "MH", "name": "Marshall Islands", "isd": "692" }, { "code": "MK", "name": "Macedonia", "isd": "389" }, { "code": "MU", "name": "Mauritius", "isd": "230" }, { "code": "MT", "name": "Malta", "isd": "356" }, { "code": "MW", "name": "Malawi", "isd": "265" }, { "code": "MV", "name": "Maldives", "isd": "960" }, { "code": "MQ", "name": "Martinique", "isd": "596" }, { "code": "MP", "name": "Northern Mariana Islands", "isd": "+1-670" }, { "code": "MS", "name": "Montserrat", "isd": "+1-664" }, { "code": "MR", "name": "Mauritania", "isd": "222" }, { "code": "IM", "name": "Isle of Man", "isd": "+44-1624" }, { "code": "UG", "name": "Uganda", "isd": "256" }, { "code": "TZ", "name": "Tanzania", "isd": "255" }, { "code": "MY", "name": "Malaysia", "isd": "60" }, { "code": "MX", "name": "Mexico", "isd": "52" }, { "code": "IL", "name": "Israel", "isd": "972" }, { "code": "FR", "name": "France", "isd": "33" }, { "code": "IO", "name": "British Indian Ocean Territory", "isd": "246" }, { "code": "SH", "name": "Saint Helena", "isd": "290" }, { "code": "FI", "name": "Finland", "isd": "358" }, { "code": "FJ", "name": "Fiji", "isd": "679" }, { "code": "FK", "name": "Falkland Islands", "isd": "500" }, { "code": "FM", "name": "Micronesia", "isd": "691" }, { "code": "FO", "name": "Faroe Islands", "isd": "298" }, { "code": "NI", "name": "Nicaragua", "isd": "505" }, { "code": "NL", "name": "Netherlands", "isd": "31" }, { "code": "NO", "name": "Norway", "isd": "47" }, { "code": "NA", "name": "Namibia", "isd": "264" }, { "code": "VU", "name": "Vanuatu", "isd": "678" }, { "code": "NC", "name": "New Caledonia", "isd": "687" }, { "code": "NE", "name": "Niger", "isd": "227" }, { "code": "NF", "name": "Norfolk Island", "isd": "672" }, { "code": "NG", "name": "Nigeria", "isd": "234" }, { "code": "NZ", "name": "New Zealand", "isd": "64" }, { "code": "NP", "name": "Nepal", "isd": "977" }, { "code": "NR", "name": "Nauru", "isd": "674" }, { "code": "NU", "name": "Niue", "isd": "683" }, { "code": "CK", "name": "Cook Islands", "isd": "682" }, { "code": "XK", "name": "Kosovo", "isd": "" }, { "code": "CI", "name": "Ivory Coast", "isd": "225" }, { "code": "CH", "name": "Switzerland", "isd": "41" }, { "code": "CO", "name": "Colombia", "isd": "57" }, { "code": "CN", "name": "China", "isd": "86" }, { "code": "CM", "name": "Cameroon", "isd": "237" }, { "code": "CL", "name": "Chile", "isd": "56" }, { "code": "CC", "name": "Cocos Islands", "isd": "61" }, { "code": "CA", "name": "Canada", "isd": "1" }, { "code": "CG", "name": "Republic of the Congo", "isd": "242" }, { "code": "CF", "name": "Central African Republic", "isd": "236" }, { "code": "CD", "name": "Democratic Republic of the Congo", "isd": "243" }, { "code": "CZ", "name": "Czech Republic", "isd": "420" }, { "code": "CY", "name": "Cyprus", "isd": "357" }, { "code": "CX", "name": "Christmas Island", "isd": "61" }, { "code": "CR", "name": "Costa Rica", "isd": "506" }, { "code": "CW", "name": "Curacao", "isd": "599" }, { "code": "CV", "name": "Cape Verde", "isd": "238" }, { "code": "CU", "name": "Cuba", "isd": "53" }, { "code": "SZ", "name": "Swaziland", "isd": "268" }, { "code": "SY", "name": "Syria", "isd": "963" }, { "code": "SX", "name": "Sint Maarten", "isd": "599" }, { "code": "KG", "name": "Kyrgyzstan", "isd": "996" }, { "code": "KE", "name": "Kenya", "isd": "254" }, { "code": "SS", "name": "South Sudan", "isd": "211" }, { "code": "SR", "name": "Suriname", "isd": "597" }, { "code": "KI", "name": "Kiribati", "isd": "686" }, { "code": "KH", "name": "Cambodia", "isd": "855" }, { "code": "KN", "name": "Saint Kitts and Nevis", "isd": "+1-869" }, { "code": "KM", "name": "Comoros", "isd": "269" }, { "code": "ST", "name": "Sao Tome and Principe", "isd": "239" }, { "code": "SK", "name": "Slovakia", "isd": "421" }, { "code": "KR", "name": "South Korea", "isd": "82" }, { "code": "SI", "name": "Slovenia", "isd": "386" }, { "code": "KP", "name": "North Korea", "isd": "850" }, { "code": "KW", "name": "Kuwait", "isd": "965" }, { "code": "SN", "name": "Senegal", "isd": "221" }, { "code": "SM", "name": "San Marino", "isd": "378" }, { "code": "SL", "name": "Sierra Leone", "isd": "232" }, { "code": "SC", "name": "Seychelles", "isd": "248" }, { "code": "KZ", "name": "Kazakhstan", "isd": "7" }, { "code": "KY", "name": "Cayman Islands", "isd": "+1-345" }, { "code": "SG", "name": "Singapore", "isd": "65" }, { "code": "SE", "name": "Sweden", "isd": "46" }, { "code": "SD", "name": "Sudan", "isd": "249" }, { "code": "DO", "name": "Dominican Republic", "isd": "+1-809 and 1-829" }, { "code": "DM", "name": "Dominica", "isd": "+1-767" }, { "code": "DJ", "name": "Djibouti", "isd": "253" }, { "code": "DK", "name": "Denmark", "isd": "45" }, { "code": "VG", "name": "British Virgin Islands", "isd": "+1-284" }, { "code": "DE", "name": "Germany", "isd": "49" }, { "code": "YE", "name": "Yemen", "isd": "967" }, { "code": "DZ", "name": "Algeria", "isd": "213" }, { "code": "US", "name": "United States", "isd": "1" }, { "code": "UY", "name": "Uruguay", "isd": "598" }, { "code": "YT", "name": "Mayotte", "isd": "262" }, { "code": "UM", "name": "United States Minor Outlying Islands", "isd": "1" }, { "code": "LB", "name": "Lebanon", "isd": "961" }, { "code": "LC", "name": "Saint Lucia", "isd": "+1-758" }, { "code": "LA", "name": "Laos", "isd": "856" }, { "code": "TV", "name": "Tuvalu", "isd": "688" }, { "code": "TW", "name": "Taiwan", "isd": "886" }, { "code": "TT", "name": "Trinidad and Tobago", "isd": "+1-868" }, { "code": "TR", "name": "Turkey", "isd": "90" }, { "code": "LK", "name": "Sri Lanka", "isd": "94" }, { "code": "LI", "name": "Liechtenstein", "isd": "423" }, { "code": "LV", "name": "Latvia", "isd": "371" }, { "code": "TO", "name": "Tonga", "isd": "676" }, { "code": "LT", "name": "Lithuania", "isd": "370" }, { "code": "LU", "name": "Luxembourg", "isd": "352" }, { "code": "LR", "name": "Liberia", "isd": "231" }, { "code": "LS", "name": "Lesotho", "isd": "266" }, { "code": "TH", "name": "Thailand", "isd": "66" }, { "code": "TF", "name": "French Southern Territories", "isd": "" }, { "code": "TG", "name": "Togo", "isd": "228" }, { "code": "TD", "name": "Chad", "isd": "235" }, { "code": "TC", "name": "Turks and Caicos Islands", "isd": "+1-649" }, { "code": "LY", "name": "Libya", "isd": "218" }, { "code": "VA", "name": "Vatican", "isd": "379" }, { "code": "VC", "name": "Saint Vincent and the Grenadines", "isd": "+1-784" }, { "code": "AE", "name": "United Arab Emirates", "isd": "971" }, { "code": "AD", "name": "Andorra", "isd": "376" }, { "code": "AG", "name": "Antigua and Barbuda", "isd": "+1-268" }, { "code": "AF", "name": "Afghanistan", "isd": "93" }, { "code": "AI", "name": "Anguilla", "isd": "+1-264" }, { "code": "VI", "name": "U.S. Virgin Islands", "isd": "+1-340" }, { "code": "IS", "name": "Iceland", "isd": "354" }, { "code": "IR", "name": "Iran", "isd": "98" }, { "code": "AM", "name": "Armenia", "isd": "374" }, { "code": "AL", "name": "Albania", "isd": "355" }, { "code": "AO", "name": "Angola", "isd": "244" }, { "code": "AQ", "name": "Antarctica", "isd": "" }, { "code": "AS", "name": "American Samoa", "isd": "+1-684" }, { "code": "AR", "name": "Argentina", "isd": "54" }, { "code": "AU", "name": "Australia", "isd": "61" }, { "code": "AT", "name": "Austria", "isd": "43" }, { "code": "AW", "name": "Aruba", "isd": "297" }, { "code": "IN", "name": "India", "isd": "91" }, { "code": "AX", "name": "Aland Islands", "isd": "+358-18" }, { "code": "AZ", "name": "Azerbaijan", "isd": "994" }, { "code": "IE", "name": "Ireland", "isd": "353" }, { "code": "ID", "name": "Indonesia", "isd": "62" }, { "code": "UA", "name": "Ukraine", "isd": "380" }, { "code": "QA", "name": "Qatar", "isd": "974" }, { "code": "MZ", "name": "Mozambique", "isd": "258" }];

  constructor(
    public appService: AppService,
    public router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  public goToSignIn: any = () => {

    this.router.navigate(['/']);

  } // end goToSignIn

  public signupFunction: any = () => {



    if (!this.firstName) {
      this.toastr.warning('enter first name')


    } else if (!this.lastName) {
      this.toastr.warning('enter last name')


    } else if (!this.country) {
      this.toastr.warning('select country code')


    } else if (!this.mobileNumber) {
      this.toastr.warning('enter mobile')

    } else if (!this.email) {
      this.toastr.warning('enter email')

    } else if (!this.password) {
      this.toastr.warning('enter password')


    }else if (!this.confirmPassword) {
      this.toastr.warning('enter password again to confirm')


    } else if (this.password !== this.confirmPassword) {
      this.toastr.warning('Sorry your password did not match with password you entered to confirm. Please try again')


    }else {

      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobileNumber: this.mobileNumber,
        email: this.email,
        password: this.password

      }

      console.log(data);

      this.appService.signupFunction(data)
        .subscribe((apiResponse) => {

          console.log(apiResponse);

          if (apiResponse.status === 200) {

            this.toastr.success('Signup successful');

            setTimeout(() => {

              this.goToSignIn();

            }, 2000);

          } else {

            this.toastr.error(apiResponse.message);

          }

        }, (err) => {

          this.toastr.error('some error occured');

        });

    } // end condition

  } // end signupFunction


}
