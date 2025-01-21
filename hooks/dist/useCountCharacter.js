var useCharacterCounter = function (max) {
    var _a = useState(0), count = _a[0], setCount = _a[1];
    var _b = useState(''), warning = _b[0], setWarning = _b[1];
    var updateCount = function (text) {
        var length = text.length;
        if (length > max) {
            setWarning("Character limit exceeded! Max: " + max);
        }
        else {
            setWarning('');
        }
        setCount(length);
    };
    return { count: count, warning: warning, updateCount: updateCount };
};
