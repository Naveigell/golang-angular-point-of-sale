export const currency = {
    indonesian: function (value) {
        return 'Rp ' + value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
    }
};
