function statShortName(name: string): string {
    return name
        .replaceAll('special', 'S')
        .replaceAll('-', '')
        .replaceAll('attack', 'ATK')
        .replaceAll('defense', 'DEF')
        .replaceAll('speed', 'SPD')
        .toUpperCase()
}

export default statShortName;
