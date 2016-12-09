
Vue.component('seed', {
    props: {
        message: String,
        seedType: String,
        value: String,
        seed: String
    },
    template: '\
        <div class="form-group">\
        <div class="input-group">\
        <span class="input-group-addon" id="basic-addon">{{ seedType }}</span>\
            <input v-bind:value="value" type="text" class="form-control" readonly>{{ seed }}</input>\
        </div>\
            <small id="help" class="form-text text-muted">{{ message }}</small>\
        </div>',
    methods: {
        updateValue: function(value) {
            this.$emit('input', value);
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        selected: "BIP39",
        bip39: "",
        mnemonic: "",
        sentastic: "",
        hexStr: "",
        hex: "",
        input: "",
        error: ""
    },
    watch: {
        hex: function(val) {
            console.log(val)
            this.bip39 = bip39.entropyToMnemonic(val);
            this.mnemonic = Mnemonic.fromHex(val).toWords().join(' ');
            this.sentastic = Sentastic.entropyToMnemonic(val);
        }
    },
    methods: {
        onBip39: function() {
            this.selected = "BIP39";
        },
        onMnemonic: function() {
            this.selected = "Mnemonic";
        },
        onSentastic: function() {
            this.selected = "Sentastic";
        },
        onHex: function() {
            this.selected = "Hex";
        },
        onGo: function() {
            this.error = "";
            if (this.selected === "BIP39") {
                try {
                    this.hex = bip39.mnemonicToEntropy(this.input).toString("hex");
                } catch(e) {
                    this.error = e.message;
                }
            } else if (this.selected === "Mnemonic") {
                try {
                    this.hex = Mnemonic.fromWords(this.input.split(' ')).toHex();
                } catch(e) {
                    this.error = e.message;
                }
            } else if (this.selected === "Sentastic") {
                try {
                    this.hex = Sentastic.mnemonicToEntropy(this.input).toString("hex");
                } catch(e) {
                    this.error = e.message;
                }
            } else if (this.selected === "Hex") {
                this.hex = this.input;
            }
        }   
    },
    computed: {
        hexStr: function() {
            return "0x" + this.hex;
        },
        hexSelected: function() {
            return this.selected === "Hex";
        },
        hasError: function() {
            return this.error != "";
        }
    }
});
