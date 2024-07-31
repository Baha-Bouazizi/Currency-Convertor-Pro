class FavoriteCurrencies {
    constructor() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userEmail = currentUser ? currentUser.email : '';
        this.favoriteCurrencies = JSON.parse(localStorage.getItem(`favoriteCurrencies_${this.userEmail}`)) || [];
        this.currencyData = [];
        this.currencyDetails = {
            'USD': {
                name: 'US Dollar',
                symbol: '$',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: '¢',
                topConversion: 'USD to EUR',
                topChart: 'USD to EUR chart',
                nicknames: 'greenback, buck, green, dough, smacker, bones, dead presidents, scrillas, paper',
                coins: 'Freq used: 1¢, 5¢, 10¢, 25¢; Rarely used: 50¢, $1',
                bankNotes: 'Freq used: $1, $5, $10, $20, $50, $100; Rarely used: $2',
                centralBank: 'Federal Reserve Bank',
                users: 'United States, America, American Samoa, American Virgin Islands, British Indian Ocean Territory, British Virgin Islands, Ecuador, El Salvador, Guam, Haiti, Micronesia, Northern Mariana Islands, Palau, Panama, Puerto Rico, Turks and Caicos Islands, United States Minor Outlying Islands, Wake Island, East Timor'
            },
            'EUR': {
                name: 'Euro',
                symbol: '€',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: 'c',
                topConversion: 'EUR to USD',
                topChart: 'EUR to USD chart',
                nicknames: 'euro',
                coins: 'Freq used: 1c, 2c, 5c, 10c, 20c, 50c, €1, €2',
                bankNotes: 'Freq used: €5, €10, €20, €50, €100, €200, €500',
                centralBank: 'European Central Bank',
                users: 'Eurozone countries and some other countries'
            },
            'GBP': {
                name: 'British Pound Sterling',
                symbol: '£',
                minorUnit: '1/100 = penny',
                minorUnitSymbol: 'p',
                topConversion: 'GBP to USD',
                topChart: 'GBP to USD chart',
                nicknames: 'pound, quid, sterling',
                coins: 'Freq used: 1p, 2p, 5p, 10p, 20p, 50p, £1, £2',
                bankNotes: 'Freq used: £5, £10, £20, £50; Rarely used: £1',
                centralBank: 'Bank of England',
                users: 'United Kingdom, Gibraltar, South Sandwich Islands, Tristan da Cunha'
            },
            'JPY': {
                name: 'Japanese Yen',
                symbol: '¥',
                minorUnit: '1 = sen (rarely used)',
                minorUnitSymbol: '¥',
                topConversion: 'JPY to USD',
                topChart: 'JPY to USD chart',
                nicknames: 'yen, en',
                coins: 'Freq used: ¥1, ¥5, ¥10, ¥50, ¥100, ¥500',
                bankNotes: 'Freq used: ¥1,000, ¥5,000, ¥10,000',
                centralBank: 'Bank of Japan',
                users: 'Japan'
            },
            'AUD': {
                name: 'Australian Dollar',
                symbol: '$',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: '¢',
                topConversion: 'AUD to USD',
                topChart: 'AUD to USD chart',
                nicknames: 'Aussie dollar, AUD',
                coins: 'Freq used: 5¢, 10¢, 20¢, 50¢, $1, $2',
                bankNotes: 'Freq used: $5, $10, $20, $50, $100',
                centralBank: 'Reserve Bank of Australia',
                users: 'Australia, Papua New Guinea, Nauru, Tuvalu'
            },
            'CAD': {
                name: 'Canadian Dollar',
                symbol: '$',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: '¢',
                topConversion: 'CAD to USD',
                topChart: 'CAD to USD chart',
                nicknames: 'loonie, toonie',
                coins: 'Freq used: 5¢, 10¢, 25¢, $1, $2',
                bankNotes: 'Freq used: $5, $10, $20, $50, $100',
                centralBank: 'Bank of Canada',
                users: 'Canada'
            },
            'CHF': {
                name: 'Swiss Franc',
                symbol: 'CHF',
                minorUnit: '1/100 = rappen',
                minorUnitSymbol: 'Rp',
                topConversion: 'CHF to USD',
                topChart: 'CHF to USD chart',
                nicknames: 'franc, Swiss franc',
                coins: 'Freq used: 5 Rp, 10 Rp, 20 Rp, 50 Rp, 1 Fr, 2 Fr, 5 Fr',
                bankNotes: 'Freq used: 10 Fr, 20 Fr, 50 Fr, 100 Fr, 200 Fr, 1,000 Fr',
                centralBank: 'Swiss National Bank',
                users: 'Switzerland, Liechtenstein'
            },
            'CNY': {
                name: 'Chinese Yuan Renminbi',
                symbol: '¥',
                minorUnit: '1/10 = jiao, 1/100 = fen',
                minorUnitSymbol: 'jiao, fen',
                topConversion: 'CNY to USD',
                topChart: 'CNY to USD chart',
                nicknames: 'yuan, renminbi',
                coins: 'Freq used: ¥1',
                bankNotes: 'Freq used: ¥1, ¥5, ¥10, ¥20, ¥50, ¥100',
                centralBank: 'People\'s Bank of China',
                users: 'China'
            },
            'SEK': {
                name: 'Swedish Krona',
                symbol: 'kr',
                minorUnit: '1/100 = öre',
                minorUnitSymbol: 'öre',
                topConversion: 'SEK to USD',
                topChart: 'SEK to USD chart',
                nicknames: 'krona',
                coins: 'Freq used: 1 kr, 5 kr, 10 kr, 25 kr',
                bankNotes: 'Freq used: 20 kr, 50 kr, 100 kr, 500 kr, 1,000 kr',
                centralBank: 'Sveriges Riksbank',
                users: 'Sweden'
            },
            'NZD': {
                name: 'New Zealand Dollar',
                symbol: '$',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: '¢',
                topConversion: 'NZD to USD',
                topChart: 'NZD to USD chart',
                nicknames: 'kiwi dollar',
                coins: 'Freq used: 10¢, 20¢, 50¢, $1, $2',
                bankNotes: 'Freq used: $5, $10, $20, $50, $100',
                centralBank: 'Reserve Bank of New Zealand',
                users: 'New Zealand, Cook Islands, Niue, Tokelau'
            },
            'MXN': {
                name: 'Mexican Peso',
                symbol: '$',
                minorUnit: '1/100 = centavo',
                minorUnitSymbol: 'c',
                topConversion: 'MXN to USD',
                topChart: 'MXN to USD chart',
                nicknames: 'peso',
                coins: 'Freq used: 5c, 10c, 20c, 50c, $1, $2, $5, $10',
                bankNotes: 'Freq used: $20, $50, $100, $200, $500, $1,000',
                centralBank: 'Bank of Mexico',
                users: 'Mexico'
            },
            'SGD': {
                name: 'Singapore Dollar',
                symbol: '$',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: '¢',
                topConversion: 'SGD to USD',
                topChart: 'SGD to USD chart',
                nicknames: 'SGD',
                coins: 'Freq used: 5¢, 10¢, 20¢, 50¢, $1, $5',
                bankNotes: 'Freq used: $2, $5, $10, $50, $100, $1,000',
                centralBank: 'Monetary Authority of Singapore',
                users: 'Singapore'
            },
            'HKD': {
                name: 'Hong Kong Dollar',
                symbol: '$',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: '¢',
                topConversion: 'HKD to USD',
                topChart: 'HKD to USD chart',
                nicknames: 'HKD',
                coins: 'Freq used: 10¢, 20¢, 50¢, $1, $2, $5, $10',
                bankNotes: 'Freq used: $20, $50, $100, $500, $1,000',
                centralBank: 'Hong Kong Monetary Authority',
                users: 'Hong Kong, Macau'
            },
            'NOK': {
                name: 'Norwegian Krone',
                symbol: 'kr',
                minorUnit: '1/100 = øre',
                minorUnitSymbol: 'øre',
                topConversion: 'NOK to USD',
                topChart: 'NOK to USD chart',
                nicknames: 'krone',
                coins: 'Freq used: 1 kr, 5 kr, 10 kr, 20 kr',
                bankNotes: 'Freq used: 50 kr, 100 kr, 200 kr, 500 kr, 1,000 kr',
                centralBank: 'Norges Bank',
                users: 'Norway'
            },
            'KRW': {
                name: 'South Korean Won',
                symbol: '₩',
                minorUnit: '1/100 = jeon (rarely used)',
                minorUnitSymbol: 'jeon',
                topConversion: 'KRW to USD',
                topChart: 'KRW to USD chart',
                nicknames: 'won',
                coins: 'Freq used: ₩1, ₩5, ₩10, ₩50, ₩100, ₩500',
                bankNotes: 'Freq used: ₩1,000, ₩5,000, ₩10,000, ₩50,000',
                centralBank: 'Bank of Korea',
                users: 'South Korea'
            },
            'TRY': {
                name: 'Turkish Lira',
                symbol: '₺',
                minorUnit: '1/100 = kuruş',
                minorUnitSymbol: 'kuruş',
                topConversion: 'TRY to USD',
                topChart: 'TRY to USD chart',
                nicknames: 'lira',
                coins: 'Freq used: 1 kuruş, 5 kuruş, 10 kuruş, 25 kuruş, 50 kuruş, ₺1',
                bankNotes: 'Freq used: ₺5, ₺10, ₺20, ₺50, ₺100, ₺200',
                centralBank: 'Central Bank of the Republic of Turkey',
                users: 'Turkey, Northern Cyprus'
            },
            'RUB': {
                name: 'Russian Ruble',
                symbol: '₽',
                minorUnit: '1/100 = kopeck',
                minorUnitSymbol: 'kop',
                topConversion: 'RUB to USD',
                topChart: 'RUB to USD chart',
                nicknames: 'ruble',
                coins: 'Freq used: 1 kop, 5 kop, 10 kop, 50 kop, ₽1, ₽5, ₽10, ₽50',
                bankNotes: 'Freq used: ₽10, ₽50, ₽100, ₽500, ₽1,000, ₽5,000',
                centralBank: 'Central Bank of Russia',
                users: 'Russia, Abkhazia, South Ossetia'
            },
            'INR': {
                name: 'Indian Rupee',
                symbol: '₹',
                minorUnit: '1/100 = paise',
                minorUnitSymbol: 'p',
                topConversion: 'INR to USD',
                topChart: 'INR to USD chart',
                nicknames: 'rupee',
                coins: 'Freq used: ₹1, ₹2, ₹5, ₹10',
                bankNotes: 'Freq used: ₹10, ₹20, ₹50, ₹100, ₹200, ₹500, ₹2,000',
                centralBank: 'Reserve Bank of India',
                users: 'India'
            },
            'BRL': {
                name: 'Brazilian Real',
                symbol: 'R$',
                minorUnit: '1/100 = centavo',
                minorUnitSymbol: 'c',
                topConversion: 'BRL to USD',
                topChart: 'BRL to USD chart',
                nicknames: 'real',
                coins: 'Freq used: 1c, 5c, 10c, 25c, 50c, R$1, R$2',
                bankNotes: 'Freq used: R$2, R$5, R$10, R$20, R$50, R$100',
                centralBank: 'Central Bank of Brazil',
                users: 'Brazil'
            },
            'ZAR': {
                name: 'South African Rand',
                symbol: 'R',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: 'c',
                topConversion: 'ZAR to USD',
                topChart: 'ZAR to USD chart',
                nicknames: 'rand',
                coins: 'Freq used: 1c, 5c, 10c, 20c, 50c, R1, R2, R5',
                bankNotes: 'Freq used: R10, R20, R50, R100, R200',
                centralBank: 'South African Reserve Bank',
                users: 'South Africa'
            },
            'DKK': {
                name: 'Danish Krone',
                symbol: 'kr',
                minorUnit: '1/100 = øre',
                minorUnitSymbol: 'øre',
                topConversion: 'DKK to USD',
                topChart: 'DKK to USD chart',
                nicknames: 'krone',
                coins: 'Freq used: 50 øre, 1 kr, 2 kr, 5 kr, 10 kr, 20 kr',
                bankNotes: 'Freq used: 50 kr, 100 kr, 200 kr, 500 kr, 1,000 kr',
                centralBank: 'Danmarks Nationalbank',
                users: 'Denmark, Greenland, Faroe Islands'
            },
            'PLN': {
                name: 'Polish Zloty',
                symbol: 'zł',
                minorUnit: '1/100 = grosz',
                minorUnitSymbol: 'gr',
                topConversion: 'PLN to USD',
                topChart: 'PLN to USD chart',
                nicknames: 'zloty',
                coins: 'Freq used: 1 gr, 2 gr, 5 gr, 10 gr, 20 gr, 50 gr, 1 zł, 2 zł, 5 zł',
                bankNotes: 'Freq used: 10 zł, 20 zł, 50 zł, 100 zł, 200 zł, 500 zł',
                centralBank: 'National Bank of Poland',
                users: 'Poland'
            },
            'HUF': {
                name: 'Hungarian Forint',
                symbol: 'Ft',
                minorUnit: '1/100 = fillér',
                minorUnitSymbol: 'f',
                topConversion: 'HUF to USD',
                topChart: 'HUF to USD chart',
                nicknames: 'forint',
                coins: 'Freq used: 5 Ft, 10 Ft, 20 Ft, 50 Ft, 100 Ft, 200 Ft',
                bankNotes: 'Freq used: 500 Ft, 1,000 Ft, 2,000 Ft, 5,000 Ft, 10,000 Ft, 20,000 Ft',
                centralBank: 'Hungarian National Bank',
                users: 'Hungary'
            },
            'TWD': {
                name: 'New Taiwan Dollar',
                symbol: 'NT$',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: '¢',
                topConversion: 'TWD to USD',
                topChart: 'TWD to USD chart',
                nicknames: 'Taiwan dollar',
                coins: 'Freq used: 1 NT$, 5 NT$, 10 NT$, 20 NT$, 50 NT$',
                bankNotes: 'Freq used: NT$100, NT$500, NT$1,000, NT$2,000',
                centralBank: 'Central Bank of the Republic of China',
                users: 'Taiwan'
            },
            'ARS': {
                name: 'Argentine Peso',
                symbol: '$',
                minorUnit: '1/100 = centavo',
                minorUnitSymbol: 'c',
                topConversion: 'ARS to USD',
                topChart: 'ARS to USD chart',
                nicknames: 'peso',
                coins: 'Freq used: 1c, 5c, 10c, 25c, 50c, $1, $2',
                bankNotes: 'Freq used: $5, $10, $20, $50, $100, $200',
                centralBank: 'Central Bank of Argentina',
                users: 'Argentina'
            },
            'CLP': {
                name: 'Chilean Peso',
                symbol: '$',
                minorUnit: '1/100 = centavo',
                minorUnitSymbol: 'c',
                topConversion: 'CLP to USD',
                topChart: 'CLP to USD chart',
                nicknames: 'peso',
                coins: 'Freq used: 1c, 5c, 10c, 50c, $1, $5, $10',
                bankNotes: 'Freq used: $1,000, $5,000, $10,000, $20,000',
                centralBank: 'Central Bank of Chile',
                users: 'Chile'
            },
            'EGP': {
                name: 'Egyptian Pound',
                symbol: '£',
                minorUnit: '1/100 = piastre',
                minorUnitSymbol: 'p',
                topConversion: 'EGP to USD',
                topChart: 'EGP to USD chart',
                nicknames: 'pound',
                coins: 'Freq used: 1 piaster, 5 piasters, 10 piasters, 20 piasters, 25 piasters, 50 piasters, £1',
                bankNotes: 'Freq used: £5, £10, £20, £50, £100, £200',
                centralBank: 'Central Bank of Egypt',
                users: 'Egypt'
            },
            'IDR': {
                name: 'Indonesian Rupiah',
                symbol: 'Rp',
                minorUnit: '1/100 = sen',
                minorUnitSymbol: 'sen',
                topConversion: 'IDR to USD',
                topChart: 'IDR to USD chart',
                nicknames: 'rupiah',
                coins: 'Freq used: 100 Rp, 200 Rp, 500 Rp, 1,000 Rp',
                bankNotes: 'Freq used: 1,000 Rp, 5,000 Rp, 10,000 Rp, 20,000 Rp, 50,000 Rp, 100,000 Rp',
                centralBank: 'Bank Indonesia',
                users: 'Indonesia'
            },
            'ISK': {
                name: 'Icelandic Króna',
                symbol: 'kr',
                minorUnit: '1/100 = aurar',
                minorUnitSymbol: 'aurar',
                topConversion: 'ISK to USD',
                topChart: 'ISK to USD chart',
                nicknames: 'krona',
                coins: 'Freq used: 1 kr, 5 kr, 10 kr, 50 kr, 100 kr',
                bankNotes: 'Freq used: 500 kr, 1,000 kr, 5,000 kr, 10,000 kr',
                centralBank: 'Central Bank of Iceland',
                users: 'Iceland'
            },
            'MYR': {
                name: 'Malaysian Ringgit',
                symbol: 'RM',
                minorUnit: '1/100 = sen',
                minorUnitSymbol: 'sen',
                topConversion: 'MYR to USD',
                topChart: 'MYR to USD chart',
                nicknames: 'ringgit',
                coins: 'Freq used: 5 sen, 10 sen, 20 sen, 50 sen, RM1',
                bankNotes: 'Freq used: RM1, RM5, RM10, RM50, RM100',
                centralBank: 'Bank Negara Malaysia',
                users: 'Malaysia'
            },
            'PHP': {
                name: 'Philippine Peso',
                symbol: '₱',
                minorUnit: '1/100 = centavo',
                minorUnitSymbol: 'c',
                topConversion: 'PHP to USD',
                topChart: 'PHP to USD chart',
                nicknames: 'peso',
                coins: 'Freq used: ₱1, ₱5, ₱10',
                bankNotes: 'Freq used: ₱20, ₱50, ₱100, ₱500, ₱1,000',
                centralBank: 'Bangko Sentral ng Pilipinas',
                users: 'Philippines'
            },
            'RSD': {
                name: 'Serbian Dinar',
                symbol: 'РСД',
                minorUnit: '1/100 = para',
                minorUnitSymbol: 'para',
                topConversion: 'RSD to USD',
                topChart: 'RSD to USD chart',
                nicknames: 'dinar',
                coins: 'Freq used: 1 dinar, 2 dinars, 5 dinars, 10 dinars',
                bankNotes: 'Freq used: 10 dinars, 20 dinars, 50 dinars, 100 dinars, 200 dinars, 500 dinars, 1,000 dinars',
                centralBank: 'National Bank of Serbia',
                users: 'Serbia'
            },
            'THB': {
                name: 'Thai Baht',
                symbol: '฿',
                minorUnit: '1/100 = satang',
                minorUnitSymbol: 'satang',
                topConversion: 'THB to USD',
                topChart: 'THB to USD chart',
                nicknames: 'baht',
                coins: 'Freq used: 25 satang, 50 satang, ฿1, ฿5, ฿10',
                bankNotes: 'Freq used: ฿20, ฿50, ฿100, ฿500, ฿1,000',
                centralBank: 'Bank of Thailand',
                users: 'Thailand'
            },
            'UAH': {
                name: 'Ukrainian Hryvnia',
                symbol: '₴',
                minorUnit: '1/100 = kopiyka',
                minorUnitSymbol: 'kop',
                topConversion: 'UAH to USD',
                topChart: 'UAH to USD chart',
                nicknames: 'hryvnia',
                coins: 'Freq used: 1 kop, 2 kop, 5 kop, 10 kop, 25 kop, 50 kop, ₴1, ₴2, ₴5, ₴10',
                bankNotes: 'Freq used: ₴1, ₴5, ₴10, ₴20, ₴50, ₴100, ₴200, ₴500, ₴1,000',
                centralBank: 'National Bank of Ukraine',
                users: 'Ukraine'
            },
            'VND': {
                name: 'Vietnamese Dong',
                symbol: '₫',
                minorUnit: '1/10 = hào, 1/100 = xu',
                minorUnitSymbol: 'hào, xu',
                topConversion: 'VND to USD',
                topChart: 'VND to USD chart',
                nicknames: 'dong',
                coins: 'Freq used: ₫200, ₫500, ₫1,000, ₫2,000, ₫5,000',
                bankNotes: 'Freq used: ₫1,000, ₫5,000, ₫10,000, ₫20,000, ₫50,000, ₫100,000, ₫200,000, ₫500,000',
                centralBank: 'State Bank of Vietnam',
                users: 'Vietnam'
            },
            'AED': {
                name: 'United Arab Emirates Dirham',
                symbol: 'د.إ',
                minorUnit: '1/100 = fils',
                minorUnitSymbol: 'fils',
                topConversion: 'AED to USD',
                topChart: 'AED to USD chart',
                nicknames: 'dirham',
                coins: 'Freq used: 1 fils, 5 fils, 10 fils, 25 fils, 50 fils, 1 AED, 5 AED',
                bankNotes: 'Freq used: 5 AED, 10 AED, 20 AED, 50 AED, 100 AED, 200 AED, 500 AED, 1,000 AED',
                centralBank: 'Central Bank of the UAE',
                users: 'United Arab Emirates'
            },
            'AFN': {
                name: 'Afghan Afghani',
                symbol: '؋',
                minorUnit: '1/100 = pul',
                minorUnitSymbol: 'pul',
                topConversion: 'AFN to USD',
                topChart: 'AFN to USD chart',
                nicknames: 'afghani',
                coins: 'Freq used: 1 afghani, 2 afghani, 5 afghani, 10 afghani, 20 afghani',
                bankNotes: 'Freq used: 1 afghani, 5 afghani, 10 afghani, 20 afghani, 50 afghani, 100 afghani, 500 afghani',
                centralBank: 'Da Afghanistan Bank',
                users: 'Afghanistan'
            },
            'ALL': {
                name: 'Albanian Lek',
                symbol: 'L',
                minorUnit: '1/100 = qindarka',
                minorUnitSymbol: 'q',
                topConversion: 'ALL to USD',
                topChart: 'ALL to USD chart',
                nicknames: 'lek',
                coins: 'Freq used: 1 lek, 5 lek, 10 lek, 20 lek, 50 lek',
                bankNotes: 'Freq used: 100 lek, 200 lek, 500 lek, 1,000 lek, 2,000 lek, 5,000 lek',
                centralBank: 'Bank of Albania',
                users: 'Albania'
            },
            'AMD': {
                name: 'Armenian Dram',
                symbol: '֏',
                minorUnit: '1/100 = luma',
                minorUnitSymbol: 'luma',
                topConversion: 'AMD to USD',
                topChart: 'AMD to USD chart',
                nicknames: 'dram',
                coins: 'Freq used: 10 dram, 20 dram, 50 dram, 100 dram, 200 dram',
                bankNotes: 'Freq used: 100 dram, 200 dram, 500 dram, 1,000 dram, 5,000 dram, 10,000 dram',
                centralBank: 'Central Bank of Armenia',
                users: 'Armenia'
            },
            'ANG': {
                name: 'Netherlands Antillean Guilder',
                symbol: 'ƒ',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: '¢',
                topConversion: 'ANG to USD',
                topChart: 'ANG to USD chart',
                nicknames: 'guilder',
                coins: 'Freq used: ƒ0.05, ƒ0.10, ƒ0.25, ƒ1, ƒ5',
                bankNotes: 'Freq used: ƒ10, ƒ25, ƒ50, ƒ100, ƒ250',
                centralBank: 'Central Bank of Curacao and Sint Maarten',
                users: 'Curacao, Sint Maarten'
            },
            'BAM': {
                name: 'Bosnia and Herzegovina Convertible Mark',
                symbol: 'KM',
                minorUnit: '1/100 = fenig',
                minorUnitSymbol: 'f',
                topConversion: 'BAM to USD',
                topChart: 'BAM to USD chart',
                nicknames: 'convertible mark',
                coins: 'Freq used: 5 f, 10 f, 20 f, 50 f, KM1',
                bankNotes: 'Freq used: KM5, KM10, KM20, KM50, KM100',
                centralBank: 'Central Bank of Bosnia and Herzegovina',
                users: 'Bosnia and Herzegovina'
            },
            'BHD': {
                name: 'Bahraini Dinar',
                symbol: 'ب.د',
                minorUnit: '1/1000 = fils',
                minorUnitSymbol: 'fils',
                topConversion: 'BHD to USD',
                topChart: 'BHD to USD chart',
                nicknames: 'dinar',
                coins: 'Freq used: 1 fils, 5 fils, 10 fils, 25 fils, 50 fils, 100 fils, 1 BHD',
                bankNotes: 'Freq used: 1 BHD, 5 BHD, 10 BHD, 20 BHD, 50 BHD',
                centralBank: 'Central Bank of Bahrain',
                users: 'Bahrain'
            },
            'BIF': {
                name: 'Burundian Franc',
                symbol: 'FBu',
                minorUnit: '1/100 = centime',
                minorUnitSymbol: 'centime',
                topConversion: 'BIF to USD',
                topChart: 'BIF to USD chart',
                nicknames: 'franc',
                coins: 'Freq used: 1 FBu, 5 FBu, 10 FBu, 20 FBu, 50 FBu',
                bankNotes: 'Freq used: 100 FBu, 500 FBu, 1,000 FBu, 5,000 FBu, 10,000 FBu',
                centralBank: 'Bank of the Republic of Burundi',
                users: 'Burundi'
            },
            'BND': {
                name: 'Brunei Dollar',
                symbol: 'B$',
                minorUnit: '1/100 = sen',
                minorUnitSymbol: 'sen',
                topConversion: 'BND to USD',
                topChart: 'BND to USD chart',
                nicknames: 'dollar',
                coins: 'Freq used: 1 sen, 5 sen, 10 sen, 25 sen, 50 sen, B$1',
                bankNotes: 'Freq used: B$1, B$5, B$10, B$50, B$100',
                centralBank: 'Monetary Authority of Brunei Darussalam',
                users: 'Brunei'
            },
            'BYN': {
                name: 'Belarusian Ruble',
                symbol: 'Br',
                minorUnit: '1/100 = kapeyka',
                minorUnitSymbol: 'kap',
                topConversion: 'BYN to USD',
                topChart: 'BYN to USD chart',
                nicknames: 'ruble',
                coins: 'Freq used: 1 kap, 2 kap, 5 kap, 10 kap, 20 kap, 50 kap, Br1, Br2, Br5',
                bankNotes: 'Freq used: Br5, Br10, Br20, Br50, Br100, Br200',
                centralBank: 'National Bank of Belarus',
                users: 'Belarus'
            },
            'BZD': {
                name: 'Belize Dollar',
                symbol: 'BZ$',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: 'c',
                topConversion: 'BZD to USD',
                topChart: 'BZD to USD chart',
                nicknames: 'dollar',
                coins: 'Freq used: 1 cent, 5 cents, 10 cents, 25 cents, BZ$1',
                bankNotes: 'Freq used: BZ$2, BZ$5, BZ$10, BZ$20, BZ$50',
                centralBank: 'Central Bank of Belize',
                users: 'Belize'
            },
            'CDF': {
                name: 'Congolese Franc',
                symbol: 'FC',
                minorUnit: '1/100 = centime',
                minorUnitSymbol: 'centime',
                topConversion: 'CDF to USD',
                topChart: 'CDF to USD chart',
                nicknames: 'franc',
                coins: 'Freq used: 1 FC, 5 FC, 10 FC, 20 FC, 50 FC',
                bankNotes: 'Freq used: 100 FC, 500 FC, 1,000 FC, 5,000 FC, 10,000 FC',
                centralBank: 'Central Bank of the Congo',
                users: 'Democratic Republic of the Congo'
            },
            'DJF': {
                name: 'Djiboutian Franc',
                symbol: 'Fdj',
                minorUnit: '1/100 = centime',
                minorUnitSymbol: 'centime',
                topConversion: 'DJF to USD',
                topChart: 'DJF to USD chart',
                nicknames: 'franc',
                coins: 'Freq used: 1 Fdj, 5 Fdj, 10 Fdj, 25 Fdj, 50 Fdj',
                bankNotes: 'Freq used: 100 Fdj, 500 Fdj, 1,000 Fdj, 5,000 Fdj',
                centralBank: 'Central Bank of Djibouti',
                users: 'Djibouti'
            },
            'DOP': {
                name: 'Dominican Peso',
                symbol: 'RD$',
                minorUnit: '1/100 = centavo',
                minorUnitSymbol: 'c',
                topConversion: 'DOP to USD',
                topChart: 'DOP to USD chart',
                nicknames: 'peso',
                coins: 'Freq used: 1c, 5c, 10c, 25c, 50c, RD$1, RD$5',
                bankNotes: 'Freq used: RD$20, RD$50, RD$100, RD$500, RD$1,000',
                centralBank: 'Central Bank of the Dominican Republic',
                users: 'Dominican Republic'
            },
            'DZD': {
                name: 'Algerian Dinar',
                symbol: 'د.ج',
                minorUnit: '1/100 = centime',
                minorUnitSymbol: 'centime',
                topConversion: 'DZD to USD',
                topChart: 'DZD to USD chart',
                nicknames: 'dinar',
                coins: 'Freq used: 1 DZD, 2 DZD, 5 DZD, 10 DZD, 20 DZD, 50 DZD',
                bankNotes: 'Freq used: 100 DZD, 200 DZD, 500 DZD, 1,000 DZD',
                centralBank: 'Bank of Algeria',
                users: 'Algeria'
            },
            'ERN': {
                name: 'Eritrean Nakfa',
                symbol: 'Nkf',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: 'c',
                topConversion: 'ERN to USD',
                topChart: 'ERN to USD chart',
                nicknames: 'nakfa',
                coins: 'Freq used: 1 Nkf, 5 Nkf, 10 Nkf, 25 Nkf, 50 Nkf',
                bankNotes: 'Freq used: 1 Nkf, 5 Nkf, 10 Nkf, 50 Nkf, 100 Nkf',
                centralBank: 'Bank of Eritrea',
                users: 'Eritrea'
            },
            'ETB': {
                name: 'Ethiopian Birr',
                symbol: 'Br',
                minorUnit: '1/100 = santim',
                minorUnitSymbol: 'santim',
                topConversion: 'ETB to USD',
                topChart: 'ETB to USD chart',
                nicknames: 'birr',
                coins: 'Freq used: 1 Br, 5 Br, 10 Br, 25 Br, 50 Br',
                bankNotes: 'Freq used: 1 Br, 5 Br, 10 Br, 50 Br, 100 Br, 200 Br, 500 Br',
                centralBank: 'National Bank of Ethiopia',
                users: 'Ethiopia'
            },
            'FJD': {
                name: 'Fijian Dollar',
                symbol: 'FJ$',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: 'c',
                topConversion: 'FJD to USD',
                topChart: 'FJD to USD chart',
                nicknames: 'dollar',
                coins: 'Freq used: 1c, 5c, 10c, 20c, 50c, FJ$1',
                bankNotes: 'Freq used: FJ$5, FJ$10, FJ$20, FJ$50, FJ$100',
                centralBank: 'Reserve Bank of Fiji',
                users: 'Fiji'
            },
            'GMD': {
                name: 'Gambian Dalasi',
                symbol: 'D',
                minorUnit: '1/100 = butut',
                minorUnitSymbol: 'butut',
                topConversion: 'GMD to USD',
                topChart: 'GMD to USD chart',
                nicknames: 'dalasi',
                coins: 'Freq used: 1 butut, 5 butut, 10 butut, 25 butut, 50 butut',
                bankNotes: 'Freq used: D5, D10, D20, D50, D100',
                centralBank: 'Central Bank of The Gambia',
                users: 'Gambia'
            },
            'GNF': {
                name: 'Guinean Franc',
                symbol: 'FG',
                minorUnit: '1/100 = centime',
                minorUnitSymbol: 'centime',
                topConversion: 'GNF to USD',
                topChart: 'GNF to USD chart',
                nicknames: 'franc',
                coins: 'Freq used: 1 FG, 5 FG, 10 FG, 25 FG, 50 FG',
                bankNotes: 'Freq used: 500 FG, 1,000 FG, 5,000 FG, 10,000 FG, 20,000 FG',
                centralBank: 'Central Bank of Guinea',
                users: 'Guinea'
            },
            'GNS': {
                name: 'Guinean Syli',
                symbol: 'Sy',
                minorUnit: '1/100 = centime',
                minorUnitSymbol: 'centime',
                topConversion: 'GNS to USD',
                topChart: 'GNS to USD chart',
                nicknames: 'syli',
                coins: 'Freq used: 1 Sy, 5 Sy, 10 Sy, 25 Sy',
                bankNotes: 'Freq used: 100 Sy, 500 Sy, 1,000 Sy, 5,000 Sy, 10,000 Sy',
                centralBank: 'Central Bank of Guinea',
                users: 'Guinea'
            },
            'GTQ': {
                name: 'Guatemalan Quetzal',
                symbol: 'Q',
                minorUnit: '1/100 = centavo',
                minorUnitSymbol: 'c',
                topConversion: 'GTQ to USD',
                topChart: 'GTQ to USD chart',
                nicknames: 'quetzal',
                coins: 'Freq used: Q0.25, Q0.50, Q1',
                bankNotes: 'Freq used: Q5, Q10, Q20, Q50, Q100',
                centralBank: 'Bank of Guatemala',
                users: 'Guatemala'
            },
            'GYD': {
                name: 'Guyanese Dollar',
                symbol: 'GY$',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: 'c',
                topConversion: 'GYD to USD',
                topChart: 'GYD to USD chart',
                nicknames: 'dollar',
                coins: 'Freq used: 1c, 5c, 10c, 25c, 50c, GY$1',
                bankNotes: 'Freq used: GY$5, GY$10, GY$20, GY$50, GY$100',
                centralBank: 'Bank of Guyana',
                users: 'Guyana'
            },
            'HNL': {
                name: 'Honduran Lempira',
                symbol: 'L',
                minorUnit: '1/100 = centavo',
                minorUnitSymbol: 'c',
                topConversion: 'HNL to USD',
                topChart: 'HNL to USD chart',
                nicknames: 'lempira',
                coins: 'Freq used: L1, L5, L10, L20',
                bankNotes: 'Freq used: L1, L5, L10, L20, L50, L100',
                centralBank: 'Central Bank of Honduras',
                users: 'Honduras'
            },
            'HTG': {
                name: 'Haitian Gourde',
                symbol: 'G',
                minorUnit: '1/100 = centime',
                minorUnitSymbol: 'centime',
                topConversion: 'HTG to USD',
                topChart: 'HTG to USD chart',
                nicknames: 'gourde',
                coins: 'Freq used: 1 G, 5 G, 10 G, 20 G, 50 G',
                bankNotes: 'Freq used: 5 G, 10 G, 20 G, 50 G, 100 G',
                centralBank: 'Bank of the Republic of Haiti',
                users: 'Haiti'
            },
            'HUF': {
                name: 'Hungarian Forint',
                symbol: 'Ft',
                minorUnit: '1/100 = fillér',
                minorUnitSymbol: 'fillér',
                topConversion: 'HUF to USD',
                topChart: 'HUF to USD chart',
                nicknames: 'forint',
                coins: 'Freq used: 5 Ft, 10 Ft, 20 Ft, 50 Ft, 100 Ft, 200 Ft',
                bankNotes: 'Freq used: 500 Ft, 1,000 Ft, 2,000 Ft, 5,000 Ft, 10,000 Ft',
                centralBank: 'Hungarian National Bank',
                users: 'Hungary'
            },
            'IQD': {
                name: 'Iraqi Dinar',
                symbol: 'ع.د',
                minorUnit: '1/1,000 = fils',
                minorUnitSymbol: 'fils',
                topConversion: 'IQD to USD',
                topChart: 'IQD to USD chart',
                nicknames: 'dinar',
                coins: 'Freq used: 1 fils, 5 fils, 10 fils, 25 fils, 50 fils, 100 fils',
                bankNotes: 'Freq used: 250 IQD, 500 IQD, 1,000 IQD, 5,000 IQD, 10,000 IQD',
                centralBank: 'Central Bank of Iraq',
                users: 'Iraq'
            },
            'IRR': {
                name: 'Iranian Rial',
                symbol: '﷼',
                minorUnit: '1/100 = dinar',
                minorUnitSymbol: 'dinar',
                topConversion: 'IRR to USD',
                topChart: 'IRR to USD chart',
                nicknames: 'rial',
                coins: 'Freq used: 1 rial, 5 rials, 10 rials, 25 rials, 50 rials, 100 rials',
                bankNotes: 'Freq used: 1,000 rials, 5,000 rials, 10,000 rials, 20,000 rials, 50,000 rials',
                centralBank: 'Central Bank of Iran',
                users: 'Iran'
            },
            'JMD': {
                name: 'Jamaican Dollar',
                symbol: 'J$',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: 'c',
                topConversion: 'JMD to USD',
                topChart: 'JMD to USD chart',
                nicknames: 'dollar',
                coins: 'Freq used: 1 J$1, 5 J$5, 10 J$10',
                bankNotes: 'Freq used: J$50, J$100, J$500, J$1,000',
                centralBank: 'Bank of Jamaica',
                users: 'Jamaica'
            },
            'KES': {
                name: 'Kenyan Shilling',
                symbol: 'KSh',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: 'c',
                topConversion: 'KES to USD',
                topChart: 'KES to USD chart',
                nicknames: 'shilling',
                coins: 'Freq used: 1 KSh, 5 KSh, 10 KSh, 20 KSh, 50 KSh',
                bankNotes: 'Freq used: 100 KSh, 200 KSh, 500 KSh, 1,000 KSh',
                centralBank: 'Central Bank of Kenya',
                users: 'Kenya'
            },
            'KGS': {
                name: 'Kyrgystani Som',
                symbol: 'сом',
                minorUnit: '1/100 = tyiyn',
                minorUnitSymbol: 'tyiyn',
                topConversion: 'KGS to USD',
                topChart: 'KGS to USD chart',
                nicknames: 'som',
                coins: 'Freq used: 1 tyiyn, 3 tyiyn, 5 tyiyn, 10 tyiyn, 20 tyiyn, 50 tyiyn, 1 som, 3 som, 5 som',
                bankNotes: 'Freq used: 1 som, 5 som, 10 som, 20 som, 50 som, 100 som',
                centralBank: 'National Bank of Kyrgyzstan',
                users: 'Kyrgyzstan'
            },
            'KHR': {
                name: 'Cambodian Riel',
                symbol: '៛',
                minorUnit: '1/100 = sen',
                minorUnitSymbol: 'sen',
                topConversion: 'KHR to USD',
                topChart: 'KHR to USD chart',
                nicknames: 'riel',
                coins: 'Freq used: 50 sen, 100 sen, 200 sen, 500 sen',
                bankNotes: 'Freq used: 1,000 KHR, 5,000 KHR, 10,000 KHR, 50,000 KHR',
                centralBank: 'National Bank of Cambodia',
                users: 'Cambodia'
            },
            'KID': {
                name: 'Kiribati Dollar',
                symbol: 'K$',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: 'c',
                topConversion: 'KID to USD',
                topChart: 'KID to USD chart',
                nicknames: 'dollar',
                coins: 'Freq used: 1c, 5c, 10c, 20c, 50c, K$1',
                bankNotes: 'Freq used: K$2, K$5, K$10, K$20, K$50',
                centralBank: 'Reserve Bank of Kiribati',
                users: 'Kiribati'
            },
            'KPW': {
                name: 'North Korean Won',
                symbol: '₩',
                minorUnit: '1/100 = chon',
                minorUnitSymbol: 'chon',
                topConversion: 'KPW to USD',
                topChart: 'KPW to USD chart',
                nicknames: 'won',
                coins: 'Freq used: 1 chon, 5 chon, 10 chon, 25 chon, 50 chon',
                bankNotes: 'Freq used: 1 KPW, 5 KPW, 10 KPW, 50 KPW, 100 KPW',
                centralBank: 'Central Bank of the Democratic People\'s Republic of Korea',
                users: 'North Korea'
            },
            'KWD': {
                name: 'Kuwaiti Dinar',
                symbol: 'د.ك',
                minorUnit: '1/1,000 = fils',
                minorUnitSymbol: 'fils',
                topConversion: 'KWD to USD',
                topChart: 'KWD to USD chart',
                nicknames: 'dinar',
                coins: 'Freq used: 1 fils, 5 fils, 10 fils, 20 fils, 50 fils, 100 fils, 250 fils',
                bankNotes: 'Freq used: 1 KWD, 5 KWD, 10 KWD, 20 KWD, 50 KWD',
                centralBank: 'Central Bank of Kuwait',
                users: 'Kuwait'
            },
            'KYD': {
                name: 'Cayman Islands Dollar',
                symbol: 'KY$',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: 'c',
                topConversion: 'KYD to USD',
                topChart: 'KYD to USD chart',
                nicknames: 'dollar',
                coins: 'Freq used: 1c, 5c, 10c, 25c, 50c, KY$1',
                bankNotes: 'Freq used: KY$5, KY$10, KY$25, KY$50, KY$100',
                centralBank: 'Cayman Islands Monetary Authority',
                users: 'Cayman Islands'
            },
            'KZT': {
                name: 'Kazakhstani Tenge',
                symbol: '₸',
                minorUnit: '1/100 = tiyn',
                minorUnitSymbol: 'tiyn',
                topConversion: 'KZT to USD',
                topChart: 'KZT to USD chart',
                nicknames: 'tenge',
                coins: 'Freq used: 1 tiyn, 5 tiyn, 10 tiyn, 20 tiyn, 50 tiyn, 1 tenge, 5 tenge, 10 tenge',
                bankNotes: 'Freq used: 100 tenge, 200 tenge, 500 tenge, 1,000 tenge, 5,000 tenge',
                centralBank: 'National Bank of Kazakhstan',
                users: 'Kazakhstan'
            },
            'LAK': {
                name: 'Lao Kip',
                symbol: '₭',
                minorUnit: '1/100 = att',
                minorUnitSymbol: 'att',
                topConversion: 'LAK to USD',
                topChart: 'LAK to USD chart',
                nicknames: 'kip',
                coins: 'Freq used: 1 att, 5 att, 10 att, 20 att, 50 att, 100 att',
                bankNotes: 'Freq used: 1,000 LAK, 5,000 LAK, 10,000 LAK, 20,000 LAK, 50,000 LAK',
                centralBank: 'Bank of the Lao PDR',
                users: 'Laos'
            },
            'LBP': {
                name: 'Lebanese Pound',
                symbol: 'ل.ل',
                minorUnit: '1/100 = piastre',
                minorUnitSymbol: 'piastre',
                topConversion: 'LBP to USD',
                topChart: 'LBP to USD chart',
                nicknames: 'pound',
                coins: 'Freq used: 1 piastre, 5 piastres, 10 piastres, 25 piastres, 50 piastres',
                bankNotes: 'Freq used: 1,000 LBP, 5,000 LBP, 10,000 LBP, 50,000 LBP, 100,000 LBP',
                centralBank: 'Lebanese Central Bank',
                users: 'Lebanon'
            },
            'LKR': {
                name: 'Sri Lankan Rupee',
                symbol: 'Rs',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: 'c',
                topConversion: 'LKR to USD',
                topChart: 'LKR to USD chart',
                nicknames: 'rupee',
                coins: 'Freq used: 1 Rs, 2 Rs, 5 Rs, 10 Rs',
                bankNotes: 'Freq used: 20 Rs, 50 Rs, 100 Rs, 500 Rs, 1,000 Rs, 5,000 Rs',
                centralBank: 'Central Bank of Sri Lanka',
                users: 'Sri Lanka'
            },
            'LRD': {
                name: 'Liberian Dollar',
                symbol: 'L$',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: 'c',
                topConversion: 'LRD to USD',
                topChart: 'LRD to USD chart',
                nicknames: 'dollar',
                coins: 'Freq used: 1c, 5c, 10c, 25c, 50c, L$1',
                bankNotes: 'Freq used: L$5, L$10, L$20, L$50, L$100',
                centralBank: 'Central Bank of Liberia',
                users: 'Liberia'
            },
            'LSL': {
                name: 'Lesotho Loti',
                symbol: 'L',
                minorUnit: '1/100 = lisente',
                minorUnitSymbol: 'lisente',
                topConversion: 'LSL to USD',
                topChart: 'LSL to USD chart',
                nicknames: 'loti',
                coins: 'Freq used: 1 lisente, 2 lisente, 5 lisente, 10 lisente, 20 lisente, 50 lisente',
                bankNotes: 'Freq used: 10 L, 20 L, 50 L, 100 L, 200 L',
                centralBank: 'Central Bank of Lesotho',
                users: 'Lesotho'
            },
            'MAD': {
                name: 'Moroccan Dirham',
                symbol: 'د.م.',
                minorUnit: '1/100 = santim',
                minorUnitSymbol: 'santim',
                topConversion: 'MAD to USD',
                topChart: 'MAD to USD chart',
                nicknames: 'dirham',
                coins: 'Freq used: 1 santim, 5 santim, 10 santim, 25 santim, 50 santim, 1 MAD',
                bankNotes: 'Freq used: 20 MAD, 50 MAD, 100 MAD, 200 MAD',
                centralBank: 'Bank Al-Maghrib',
                users: 'Morocco'
            },
            'MDL': {
                name: 'Moldovan Leu',
                symbol: 'L',
                minorUnit: '1/100 = ban',
                minorUnitSymbol: 'ban',
                topConversion: 'MDL to USD',
                topChart: 'MDL to USD chart',
                nicknames: 'leu',
                coins: 'Freq used: 1 ban, 5 ban, 10 ban, 25 ban, 50 ban, 1 MDL',
                bankNotes: 'Freq used: 5 MDL, 10 MDL, 20 MDL, 50 MDL, 100 MDL',
                centralBank: 'National Bank of Moldova',
                users: 'Moldova'
            },
            'MGA': {
                name: 'Malagasy Ariary',
                symbol: 'Ar',
                minorUnit: '1/5 = iraimbilanja',
                minorUnitSymbol: 'iraimbilanja',
                topConversion: 'MGA to USD',
                topChart: 'MGA to USD chart',
                nicknames: 'ariary',
                coins: 'Freq used: 1 Ar, 5 Ar, 10 Ar, 20 Ar, 50 Ar',
                bankNotes: 'Freq used: 100 Ar, 200 Ar, 500 Ar, 1,000 Ar, 5,000 Ar, 10,000 Ar',
                centralBank: 'Bank of Madagascar',
                users: 'Madagascar'
            },
            'MKD': {
                name: 'Macedonian Denar',
                symbol: 'ден',
                minorUnit: '1/100 = deni',
                minorUnitSymbol: 'deni',
                topConversion: 'MKD to USD',
                topChart: 'MKD to USD chart',
                nicknames: 'denar',
                coins: 'Freq used: 1 den, 2 den, 5 den, 10 den, 50 den',
                bankNotes: 'Freq used: 10 den, 50 den, 100 den, 500 den, 1,000 den',
                centralBank: 'National Bank of the Republic of North Macedonia',
                users: 'North Macedonia'
            },
            'MMK': {
                name: 'Myanmar Kyat',
                symbol: 'Ks',
                minorUnit: '1/100 = pyar',
                minorUnitSymbol: 'pyar',
                topConversion: 'MMK to USD',
                topChart: 'MMK to USD chart',
                nicknames: 'kyat',
                coins: 'Freq used: 1 pyar, 5 pyar, 10 pyar, 50 pyar',
                bankNotes: 'Freq used: 100 MMK, 500 MMK, 1,000 MMK, 5,000 MMK, 10,000 MMK',
                centralBank: 'Central Bank of Myanmar',
                users: 'Myanmar'
            },
            'MNT': {
                name: 'Mongolian Tugrik',
                symbol: '₮',
                minorUnit: '1/100 = möngö',
                minorUnitSymbol: 'möngö',
                topConversion: 'MNT to USD',
                topChart: 'MNT to USD chart',
                nicknames: 'tugrik',
                coins: 'Freq used: 1 möngö, 5 möngö, 10 möngö, 20 möngö, 50 möngö',
                bankNotes: 'Freq used: 1,000 MNT, 5,000 MNT, 10,000 MNT, 20,000 MNT, 50,000 MNT',
                centralBank: 'Bank of Mongolia',
                users: 'Mongolia'
            },
            'MOP': {
                name: 'Macanese Pataca',
                symbol: 'MOP$',
                minorUnit: '1/100 = avos',
                minorUnitSymbol: 'avos',
                topConversion: 'MOP to USD',
                topChart: 'MOP to USD chart',
                nicknames: 'pataca',
                coins: 'Freq used: 1 avos, 5 avos, 10 avos, 20 avos, 50 avos, MOP$1',
                bankNotes: 'Freq used: MOP$5, MOP$10, MOP$20, MOP$50, MOP$100',
                centralBank: 'Monetary Authority of Macao',
                users: 'Macau'
            },
            'MUR': {
                name: 'Mauritian Rupee',
                symbol: '₨',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: 'c',
                topConversion: 'MUR to USD',
                topChart: 'MUR to USD chart',
                nicknames: 'rupee',
                coins: 'Freq used: 1 ₨, 5 ₨, 10 ₨, 20 ₨',
                bankNotes: 'Freq used: 25 ₨, 50 ₨, 100 ₨, 200 ₨, 500 ₨, 1,000 ₨',
                centralBank: 'Bank of Mauritius',
                users: 'Mauritius'
            },
            'MVR': {
                name: 'Maldivian Rufiyaa',
                symbol: 'MVR',
                minorUnit: '1/100 = laari',
                minorUnitSymbol: 'laari',
                topConversion: 'MVR to USD',
                topChart: 'MVR to USD chart',
                nicknames: 'rufiyaa',
                coins: 'Freq used: 1 laari, 5 laari, 10 laari, 25 laari, 50 laari',
                bankNotes: 'Freq used: 1 MVR, 5 MVR, 10 MVR, 20 MVR, 50 MVR',
                centralBank: 'Maldives Monetary Authority',
                users: 'Maldives'
            },
            'MWK': {
                name: 'Malawian Kwacha',
                symbol: 'MK',
                minorUnit: '1/100 = tambala',
                minorUnitSymbol: 'tambala',
                topConversion: 'MWK to USD',
                topChart: 'MWK to USD chart',
                nicknames: 'kwacha',
                coins: 'Freq used: 1 tambala, 5 tambala, 10 tambala, 25 tambala, 50 tambala',
                bankNotes: 'Freq used: 100 MWK, 500 MWK, 1,000 MWK, 2,000 MWK, 5,000 MWK',
                centralBank: 'Reserve Bank of Malawi',
                users: 'Malawi'
            },
            'MXN': {
                name: 'Mexican Peso',
                symbol: 'MX$',
                minorUnit: '1/100 = centavo',
                minorUnitSymbol: 'c',
                topConversion: 'MXN to USD',
                topChart: 'MXN to USD chart',
                nicknames: 'peso',
                coins: 'Freq used: 5 c, 10 c, 20 c, 50 c, MX$1, MX$2, MX$5, MX$10',
                bankNotes: 'Freq used: MX$20, MX$50, MX$100, MX$200, MX$500, MX$1,000',
                centralBank: 'Bank of Mexico',
                users: 'Mexico'
            },
            'MYR': {
                name: 'Malaysian Ringgit',
                symbol: 'RM',
                minorUnit: '1/100 = sen',
                minorUnitSymbol: 'sen',
                topConversion: 'MYR to USD',
                topChart: 'MYR to USD chart',
                nicknames: 'ringgit',
                coins: 'Freq used: 5 sen, 10 sen, 20 sen, 50 sen, RM1, RM5, RM10',
                bankNotes: 'Freq used: RM1, RM5, RM10, RM20, RM50, RM100',
                centralBank: 'Bank Negara Malaysia',
                users: 'Malaysia'
            },
            'MZN': {
                name: 'Mozambican Metical',
                symbol: 'MT',
                minorUnit: '1/100 = centavo',
                minorUnitSymbol: 'c',
                topConversion: 'MZN to USD',
                topChart: 'MZN to USD chart',
                nicknames: 'metical',
                coins: 'Freq used: 1 MT, 2 MT, 5 MT, 10 MT, 20 MT',
                bankNotes: 'Freq used: 20 MZN, 50 MZN, 100 MZN, 200 MZN, 500 MZN',
                centralBank: 'Bank of Mozambique',
                users: 'Mozambique'
            },
            'NAD': {
                name: 'Namibian Dollar',
                symbol: 'N$',
                minorUnit: '1/100 = cent',
                minorUnitSymbol: 'c',
                topConversion: 'NAD to USD',
                topChart: 'NAD to USD chart',
                nicknames: 'dollar',
                coins: 'Freq used: 5c, 10c, 20c, 50c, N$1',
                bankNotes: 'Freq used: N$5, N$10, N$20, N$50, N$100',
                centralBank: 'Bank of Namibia',
                users: 'Namibia'
            },
            'NGN': {
                name: 'Nigerian Naira',
                symbol: '₦',
                minorUnit: '1/100 = kobo',
                minorUnitSymbol: 'kobo',
                topConversion: 'NGN to USD',
                topChart: 'NGN to USD chart',
                nicknames: 'naira',
                coins: 'Freq used: 1 kobo, 5 kobo, 10 kobo, 25 kobo, 50 kobo, ₦1',
                bankNotes: 'Freq used: ₦5, ₦10, ₦20, ₦50, ₦100, ₦200, ₦500, ₦1,000',
                centralBank: 'Central Bank of Nigeria',
                users: 'Nigeria'
            },
            'TND': {
        name: 'Tunisian Dinar',
        symbol: 'د.ت',
        minorUnit: '1/1,000 = millime',
        minorUnitSymbol: 'millime',
        topConversion: 'TND to USD',
        topChart: 'TND to USD chart',
        nicknames: 'dinar',
        coins: 'Freq used: 5 millimes, 10 millimes, 20 millimes, 50 millimes, 1 TND; Rarely used: 2 TND',
        bankNotes: 'Freq used: 5 TND, 10 TND, 20 TND, 50 TND; Rarely used: 1 TND (note form)',
        centralBank: 'Central Bank of Tunisia',
        users: 'Tunisia'
        }
        
        };
        
           
        

        this.baseCurrency = 'USD'; // Default base currency
        this.init();
    }

    async init() {
        await this.fetchCurrencyData();
        this.populateCurrencySelect();
        this.displayFavoriteCurrencies();
        this.setupEventListeners();
    }

    async fetchCurrencyData() {
        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${this.baseCurrency}`);
            if (!response.ok) throw new Error('Failed to fetch currency data.');
            const data = await response.json();
            this.currencyData = Object.keys(data.rates).map(code => ({
                code: code,
                flagClass: this.getFlagClass(code)
            }));
        } catch (error) {
            console.error('Error fetching currency data:', error);
            alert('Failed to fetch currency data. Please try again later.');
        }
    }

    getFlagClass(code) {
        // Mapping of currency codes to flag classes
        const flagMap = {
          
'GBP':'gp',
'USD': 'us',
  'EUR': 'eu',
 
  'JPY': 'jp',
  'AUD': 'au',
  'CAD': 'ca',
  'CHF': 'ch',
  'CNY': 'cn',
  'SEK': 'se',
  'NZD': 'nz',
  'MXN': 'mx',
  'SGD': 'sg',
  'HKD': 'hk',
  'NOK': 'no',
  'KRW': 'kr',
  'TRY': 'tr',
  'RUB': 'ru',
  'INR': 'in',
  'BRL': 'br',
  'ZAR': 'za',
  'DKK': 'dk',
  'PLN': 'pl',
  'HUF': 'hu',
  'TWD': 'tw',
  'ARS': 'ar',
  'CLP': 'cl',
  'EGP': 'eg',
  'IDR': 'id',
  'ISK': 'is',
  'MYR': 'my',
  'PHP': 'ph',
  'RSD': 'rs',
  'THB': 'th',
  'UAH': 'ua',
  'VND': 'vn',
  'AED': 'ae',
  'AFN': 'af',
  'ALL': 'al',
  'AMD': 'am',
  'ANG': 'an',
  'AOA': 'ao',
  'BAM': 'ba',
  'BBD': 'bb',
  'BDT': 'bd',
  'BGN': 'bg',
  'BHD': 'bh',
  'BIF': 'bi',
  'BMD': 'bm',
  'BND': 'bn',
  'BOB': 'bo',
  'TND': 'tn'          };
        return flagMap[code] || '';
    }

    setupEventListeners() {
        document.getElementById('add-favorite-btn').addEventListener('click', () => this.addFavoriteCurrency());
        document.getElementById('reset-favorite-btn').addEventListener('click', () => this.resetFavoriteCurrencies());
        document.getElementById('back-to-profile-btn').addEventListener('click', () => this.navigateBackToProfile());
        document.getElementById('cli-execute-btn').addEventListener('click', () => this.handleCLICommand());
        document.getElementById('currency-select').addEventListener('change', () => this.displayCurrencyDetails());
    }

    populateCurrencySelect() {
        const select = document.getElementById('currency-select');
        select.innerHTML = '';
        this.currencyData.forEach(({ code, flagClass }) => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${code} - ${code}`;
            const flagSpan = document.createElement('span');
            flagSpan.classList.add('flag-icon', `flag-icon-${flagClass}`);
            option.prepend(flagSpan);
            select.appendChild(option);
        });
    }

    addFavoriteCurrency(currency) {
        currency = currency ? currency.trim().toUpperCase() : document.getElementById('currency-select').value.trim().toUpperCase();
        if (currency && !this.favoriteCurrencies.includes(currency)) {
            this.favoriteCurrencies.push(currency);
            localStorage.setItem(`favoriteCurrencies_${this.userEmail}`, JSON.stringify(this.favoriteCurrencies));
            this.displayFavoriteCurrencies();
        } else {
            alert("Currency is either invalid or already in your favorite list.");
        }
    }

    removeFavoriteCurrency(currency) {
        currency = currency.trim().toUpperCase();
        this.favoriteCurrencies = this.favoriteCurrencies.filter(item => item !== currency);
        localStorage.setItem(`favoriteCurrencies_${this.userEmail}`, JSON.stringify(this.favoriteCurrencies));
        this.displayFavoriteCurrencies();
    }

    resetFavoriteCurrencies() {
        this.favoriteCurrencies = [];
        localStorage.setItem(`favoriteCurrencies_${this.userEmail}`, JSON.stringify(this.favoriteCurrencies));
        this.displayFavoriteCurrencies();
    }

    displayFavoriteCurrencies() {
        const favoritesList = document.getElementById('favorites-list');
        favoritesList.innerHTML = '';
        if (this.favoriteCurrencies.length === 0) {
            favoritesList.innerHTML = '<li>No favorite currencies yet.</li>';
        } else {
            this.favoriteCurrencies.forEach(currencyCode => {
                const currency = this.currencyData.find(c => c.code === currencyCode);
                const listItem = document.createElement('li');
                const flagClass = currency ? currency.flagClass : '';
                listItem.innerHTML = `
                    <span class="flag-icon flag-icon-${flagClass}"></span> ${currencyCode}
                `;
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.addEventListener('click', () => this.removeFavoriteCurrency(currencyCode));
                listItem.appendChild(removeBtn);

                // Add click event to display currency details
                listItem.addEventListener('click', () => this.displayCurrencyDetails(currencyCode));
                
                favoritesList.appendChild(listItem);
            });
        }
    }

    displayCurrencyDetails(currencyCode = null) {
        currencyCode = currencyCode || document.getElementById('currency-select').value;
        const details = this.currencyDetails[currencyCode];
        const infoDiv = document.getElementById('currency-info');
        if (details) {
            infoDiv.innerHTML = `
                <p><strong>Name:</strong> ${details.name}</p>
                <p><strong>Symbol:</strong> ${details.symbol}</p>
                <p><strong>Minor unit:</strong> ${details.minorUnit}</p>
                <p><strong>Minor unit symbol:</strong> ${details.minorUnitSymbol}</p>
                <p><strong>Top conversion:</strong> ${details.topConversion}</p>
                <p><strong>Top chart:</strong> ${details.topChart}</p>
                <p><strong>Nicknames:</strong> ${details.nicknames}</p>
                <p><strong>Coins:</strong> ${details.coins}</p>
                <p><strong>Bank notes:</strong> ${details.bankNotes}</p>
                <p><strong>Central bank:</strong> ${details.centralBank}</p>
                <p><strong>Users:</strong> ${details.users}</p>
            `;
        } else {
            // Show message if currency details are not available
            infoDiv.innerHTML = '<p>No details available for the selected currency.</p>';
        }
    }

    navigateBackToProfile() {
        window.location.href = 'profile.html';
    }

    handleCLICommand() {
        const commandInput = document.getElementById('cli-input').value.trim().toLowerCase();
        const parts = commandInput.split(' ');
        const command = parts[0];
        const parameter = parts.slice(1).join(' ');

        switch (command) {
            case 'add':
                this.addFavoriteCurrency(parameter);
                break;
            case 'remove':
                this.removeFavoriteCurrency(parameter);
                break;
            case 'setbase':
                this.setBaseCurrency(parameter);
                break;
            case 'help':
                this.showHelp();
                break;
            default:
                alert('Invalid command. Type "help" for available commands.');
        }

        document.getElementById('cli-input').value = '';
    }

   /* setBaseCurrency(newBaseCurrency) {
        newBaseCurrency = newBaseCurrency.trim().toUpperCase();
        if (!newBaseCurrency || newBaseCurrency === this.baseCurrency) {
            alert('Invalid base currency.');
            return;
        }
        this.baseCurrency = newBaseCurrency;
        this.fetchCurrencyData();
    }*/

    showHelp() {
        alert(`Available commands:
            add <currency code> - Add a currency to favorites.
            remove <currency code> - Remove a currency from favorites.
            setbase <currency code> - Set base currency.
            help - Show available commands.`);
    }
}

// Initialize the FavoriteCurrencies instance when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const favoriteCurrenciesInstance = new FavoriteCurrencies();
});
