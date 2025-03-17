import { Observable } from '@nativescript/core';
import { RandomGenerator } from './models/random-generator';

export class MainViewModel extends Observable {
    private _numberOptions = {
        min: -100,
        max: 100,
        isFloat: false,
        decimals: 2
    };
    private _dateOptions = {
        includeFuture: true,
        includePast: true,
        startYear: 1970,
        endYear: 2050
    };
    private _wordOptions = {
        length1: 4,
        length2: 10
    };
    private _nameTypeIndex = 0;
    private _nameTypes = ['Male', 'Female', 'Non-Binary'];
    
    // Results for each generator
    private _numberResult = '';
    private _nameResult = '';
    private _wordResult = '';
    private _coinResult = '';
    private _previousCoinResult = '';
    private _colorResult = '';
    private _colorDetails = '';
    private _diceResultText = '';
    private _countryResult = '';
    private _countryDetails = '';
    private _dateResult = '';
    private _placeResult = '';
    private _placeDetails = '';
    
    // Animation states and images
    private _isCoinSpinning = false;
    private _coinImage = '~/images/coin-spinning.gif';
    private _coinResultImage = '';
    private _previousCoinImage = '';
    private _isDiceRolling = false;
    private _diceImage = '';
    private _diceResult = '';
    private _currentColor = { hex: '#FFFFFF', name: '', rgb: '', cmyk: '' };
    private _countryFlag = '';
    private _diceTypes = ['D3', 'D4', 'D5', 'D6', 'D8', 'D10', 'D12', 'D20', 'D100'];
    private _selectedDiceIndex = 5;
    private _currentDiceImage = '';

    constructor() {
        super();
        this.updateDiceImage();
    }

    // Getters and setters for all properties
    get numberOptions() { return this._numberOptions; }
    get dateOptions() { return this._dateOptions; }
    get wordOptions() { return this._wordOptions; }
    get nameTypeIndex() { return this._nameTypeIndex; }
    get nameTypes() { return this._nameTypes; }
    get numberResult() { return this._numberResult; }
    get nameResult() { return this._nameResult; }
    get wordResult() { return this._wordResult; }
    get coinResult() { return this._coinResult; }
    get previousCoinResult() { return this._previousCoinResult; }
    get colorResult() { return this._colorResult; }
    get colorDetails() { return this._colorDetails; }
    get diceResultText() { return this._diceResultText; }
    get countryResult() { return this._countryResult; }
    get countryDetails() { return this._countryDetails; }
    get dateResult() { return this._dateResult; }
    get placeResult() { return this._placeResult; }
    get placeDetails() { return this._placeDetails; }
    get isCoinSpinning() { return this._isCoinSpinning; }
    get coinImage() { return this._coinImage; }
    get coinResultImage() { return this._coinResultImage; }
    get previousCoinImage() { return this._previousCoinImage; }
    get isDiceRolling() { return this._isDiceRolling; }
    get diceImage() { return this._diceImage; }
    get diceResult() { return this._diceResult; }
    get currentColor() { return this._currentColor; }
    get countryFlag() { return this._countryFlag; }
    get diceTypes() { return this._diceTypes; }
    get selectedDiceIndex() { return this._selectedDiceIndex; }
    get currentDiceImage() { return this._currentDiceImage; }

    set nameTypeIndex(value: number) {
        if (this._nameTypeIndex !== value) {
            this._nameTypeIndex = value;
            this.notifyPropertyChange('nameTypeIndex', value);
        }
    }

    set selectedDiceIndex(value: number) {
        if (this._selectedDiceIndex !== value) {
            this._selectedDiceIndex = value;
            this.updateDiceImage();
            this.notifyPropertyChange('selectedDiceIndex', value);
        }
    }

    private updateDiceImage() {
        const diceType = this._diceTypes[this._selectedDiceIndex];
        this._currentDiceImage = `~/images/dice/d${diceType.substring(1)}.png`;
        this._diceImage = `~/images/dice/d${diceType.substring(1)}-rolling.gif`;
        this.notifyPropertyChange('currentDiceImage', this._currentDiceImage);
        this.notifyPropertyChange('diceImage', this._diceImage);
    }

    // Generator methods
    public generateNumber() {
        const result = RandomGenerator.generateNumber(this._numberOptions);
        this._numberResult = result.toString();
        this.notifyPropertyChange('numberResult', this._numberResult);
    }

    public generateName() {
        const nameType = this._nameTypes[this._nameTypeIndex].toLowerCase();
        this._nameResult = RandomGenerator.generateName(nameType);
        this.notifyPropertyChange('nameResult', this._nameResult);
    }

    public generateWord() {
        const min = Math.min(this._wordOptions.length1, this._wordOptions.length2);
        const max = Math.max(this._wordOptions.length1, this._wordOptions.length2);
        
        if (min <= 0) {
            this._wordResult = 'Error: Length must be positive';
        } else {
            this._wordResult = RandomGenerator.generateWord({ minLength: min, maxLength: max });
        }
        this.notifyPropertyChange('wordResult', this._wordResult);
    }

    public async flipCoin() {
        // Save current result as previous before new flip
        if (this._coinResult) {
            this._previousCoinResult = this._coinResult;
            this._previousCoinImage = this._coinResultImage;
            this.notifyPropertyChange('previousCoinResult', this._previousCoinResult);
            this.notifyPropertyChange('previousCoinImage', this._previousCoinImage);
        }

        this._isCoinSpinning = true;
        this.notifyPropertyChange('isCoinSpinning', true);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const result = RandomGenerator.flipCoin();
        this._coinResultImage = result === 'Heads' ? '~/images/coin-heads.png' : '~/images/coin-tails.png';
        this._coinResult = result;
        this._isCoinSpinning = false;
        
        this.notifyPropertyChange('isCoinSpinning', false);
        this.notifyPropertyChange('coinResultImage', this._coinResultImage);
        this.notifyPropertyChange('coinResult', this._coinResult);
    }

    public generateColor() {
        const color = RandomGenerator.generateColor();
        this._currentColor = color;
        this._colorResult = color.name;
        this._colorDetails = `Hex: ${color.hex} | RGB: ${color.rgb} | CMYK: ${color.cmyk}`;
        
        this.notifyPropertyChange('currentColor', this._currentColor);
        this.notifyPropertyChange('colorResult', this._colorResult);
        this.notifyPropertyChange('colorDetails', this._colorDetails);
    }

    public async rollDice() {
        this._isDiceRolling = true;
        this.notifyPropertyChange('isDiceRolling', true);
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const diceType = parseInt(this._diceTypes[this._selectedDiceIndex].substring(1));
        const result = RandomGenerator.rollDice(diceType);
        
        this._isDiceRolling = false;
        this._diceResult = result.toString();
        this._diceResultText = `Rolled ${this._diceTypes[this._selectedDiceIndex]}: ${result}`;
        
        this.notifyPropertyChange('isDiceRolling', false);
        this.notifyPropertyChange('diceResult', this._diceResult);
        this.notifyPropertyChange('diceResultText', this._diceResultText);
    }

    public generateCountry() {
        const country = RandomGenerator.generateCountry();
        this._countryResult = country.name;
        this._countryDetails = `Capital: ${country.capital}`;
        this._countryFlag = country.flag;
        
        this.notifyPropertyChange('countryResult', this._countryResult);
        this.notifyPropertyChange('countryDetails', this._countryDetails);
        this.notifyPropertyChange('countryFlag', this._countryFlag);
    }

    public generatePlace() {
        const place = RandomGenerator.generatePlace();
        this._placeResult = `${place.name} (${place.type})`;
        this._placeDetails = `${place.region}, ${place.country}\n${place.continent}\nPopulation: ${place.population}\n${place.coordinates}`;
        
        this.notifyPropertyChange('placeResult', this._placeResult);
        this.notifyPropertyChange('placeDetails', this._placeDetails);
    }

    public generateDate() {
        const date = RandomGenerator.generateDate(this._dateOptions);
        this._dateResult = date.toLocaleDateString();
        this.notifyPropertyChange('dateResult', this._dateResult);
    }
}