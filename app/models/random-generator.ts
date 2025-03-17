export interface NumberOptions {
    min: number;
    max: number;
    isFloat: boolean;
    decimals: number;
}

export interface DateOptions {
    includeFuture: boolean;
    includePast: boolean;
    startYear: number;
    endYear: number;
}

export interface WordOptions {
    minLength: number;
    maxLength: number;
}

export interface ColorInfo {
    name: string;
    hex: string;
    rgb: string;
    cmyk: string;
}

export interface CountryInfo {
    name: string;
    capital: string;
    flag: string;
}

export interface PlaceInfo {
    name: string;
    type: string;
    region: string;
    country: string;
    continent: string;
    population: string;
    coordinates: string;
}

export class RandomGenerator {
    private static readonly CONSONANTS = 'bcdfghjklmnpqrstvwxyz';
    private static readonly VOWELS = 'aeiou';
    private static readonly MALE_NAMES = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles'];
    private static readonly FEMALE_NAMES = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'];
    private static readonly NON_BINARY_NAMES = ['Alex', 'Jordan', 'Taylor', 'Sam', 'Riley', 'Morgan', 'Casey', 'Skylar', 'Quinn', 'Sage'];
    private static readonly COUNTRIES = [
        { name: 'United States', capital: 'Washington, D.C.', flag: 'https://flagcdn.com/us.svg' },
        { name: 'United Kingdom', capital: 'London', flag: 'https://flagcdn.com/gb.svg' },
        { name: 'France', capital: 'Paris', flag: 'https://flagcdn.com/fr.svg' },
        { name: 'Germany', capital: 'Berlin', flag: 'https://flagcdn.com/de.svg' },
        { name: 'Japan', capital: 'Tokyo', flag: 'https://flagcdn.com/jp.svg' }
    ];
    private static readonly ENGLISH_WORDS = require('an-array-of-english-words');
    private static readonly PLACES = [
        {
            name: "Tokyo",
            type: "City",
            region: "Kanto",
            country: "Japan",
            continent: "Asia",
            population: "37.4 million",
            coordinates: "35.6762° N, 139.6503° E"
        },
        {
            name: "Paris",
            type: "City",
            region: "Île-de-France",
            country: "France",
            continent: "Europe",
            population: "2.2 million",
            coordinates: "48.8566° N, 2.3522° E"
        },
        {
            name: "Machu Picchu",
            type: "Village",
            region: "Cusco Region",
            country: "Peru",
            continent: "South America",
            population: "Historic site",
            coordinates: "13.1631° S, 72.5450° W"
        },
        {
            name: "Sydney",
            type: "City",
            region: "New South Wales",
            country: "Australia",
            continent: "Oceania",
            population: "5.3 million",
            coordinates: "33.8688° S, 151.2093° E"
        },
        {
            name: "Marrakech",
            type: "City",
            region: "Marrakech-Safi",
            country: "Morocco",
            continent: "Africa",
            population: "928,850",
            coordinates: "31.6295° N, 7.9811° W"
        },
        {
            name: "Reykjavik",
            type: "City",
            region: "Capital Region",
            country: "Iceland",
            continent: "Europe",
            population: "122,853",
            coordinates: "64.1470° N, 21.9408° W"
        },
        {
            name: "Santorini",
            type: "Town",
            region: "South Aegean",
            country: "Greece",
            continent: "Europe",
            population: "15,550",
            coordinates: "36.3932° N, 25.4615° E"
        },
        {
            name: "Cusco",
            type: "City",
            region: "Cusco Region",
            country: "Peru",
            continent: "South America",
            population: "428,450",
            coordinates: "13.5317° S, 71.9675° W"
        },
        {
            name: "Kyoto",
            type: "City",
            region: "Kansai",
            country: "Japan",
            continent: "Asia",
            population: "1.5 million",
            coordinates: "35.0116° N, 135.7681° E"
        },
        {
            name: "Dubrovnik",
            type: "City",
            region: "Dubrovnik-Neretva",
            country: "Croatia",
            continent: "Europe",
            population: "42,615",
            coordinates: "42.6507° N, 18.0944° E"
        }
    ];

    static generateNumber(options: NumberOptions): number {
        const range = options.max - options.min;
        let result = Math.random() * range + options.min;
        if (!options.isFloat) {
            result = Math.floor(result);
        } else {
            result = parseFloat(result.toFixed(options.decimals));
        }
        return result;
    }

    static generateName(type: string): string {
        const names = type === 'male' ? this.MALE_NAMES :
                     type === 'female' ? this.FEMALE_NAMES :
                     this.NON_BINARY_NAMES;
        return names[Math.floor(Math.random() * names.length)];
    }

    static generateWord(options: WordOptions): string {
        const filteredWords = this.ENGLISH_WORDS.filter(
            word => word.length >= options.minLength && word.length <= options.maxLength
        );
        
        if (filteredWords.length === 0) {
            return 'No words found with specified length';
        }
        
        return filteredWords[Math.floor(Math.random() * filteredWords.length)];
    }

    static flipCoin(): string {
        return Math.random() > 0.5 ? 'Heads' : 'Tails';
    }

    static generateColor(): ColorInfo {
        const colors: ColorInfo[] = [
            {
                name: 'Ruby Red',
                hex: '#E0115F',
                rgb: 'rgb(224, 17, 95)',
                cmyk: 'cmyk(0, 92, 58, 12)'
            },
            {
                name: 'Sapphire Blue',
                hex: '#0F52BA',
                rgb: 'rgb(15, 82, 186)',
                cmyk: 'cmyk(92, 56, 0, 27)'
            },
            {
                name: 'Emerald Green',
                hex: '#50C878',
                rgb: 'rgb(80, 200, 120)',
                cmyk: 'cmyk(60, 0, 40, 22)'
            },
            {
                name: 'Royal Purple',
                hex: '#7851A9',
                rgb: 'rgb(120, 81, 169)',
                cmyk: 'cmyk(29, 52, 0, 34)'
            },
            {
                name: 'Golden Yellow',
                hex: '#FFDF00',
                rgb: 'rgb(255, 223, 0)',
                cmyk: 'cmyk(0, 13, 100, 0)'
            },
            {
                name: 'Turquoise',
                hex: '#40E0D0',
                rgb: 'rgb(64, 224, 208)',
                cmyk: 'cmyk(71, 0, 7, 12)'
            }
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    static rollDice(sides: number): number {
        return Math.floor(Math.random() * sides) + 1;
    }

    static generateCountry(): CountryInfo {
        return this.COUNTRIES[Math.floor(Math.random() * this.COUNTRIES.length)];
    }

    static generatePlace(): PlaceInfo {
        return this.PLACES[Math.floor(Math.random() * this.PLACES.length)];
    }

    static generateDate(options: DateOptions): Date {
        const start = new Date(options.startYear, 0, 1).getTime();
        const end = new Date(options.endYear, 11, 31).getTime();
        const timestamp = start + Math.random() * (end - start);
        return new Date(timestamp);
    }
}