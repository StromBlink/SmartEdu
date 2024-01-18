exports.splitText = function (text) {
    // Belirli bir uzunluğun altındaysa metni bölmeye gerek yok
    if (text.length < 100) {
        return [text];
    }
    else {
        var partLength = Math.ceil(text.length / 2);
        var part1 = text.substring(0, partLength);
        var part2 = text.substring(partLength);
        return [part1, part2];

    }

};