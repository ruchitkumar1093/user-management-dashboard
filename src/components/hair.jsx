import "./hair.css";

function Hair({ hairColor, setHairColor, hairType, setHairType }) {
    return (
        <div className="hr">
            <div className="label">
                <label htmlFor="hairColor">Hair color: </label>
                <select id="hairColor"
                    value={hairColor}
                    onChange={(e) => setHairColor(e.target.value)}>
                    <option value="">None</option>
                    <option value="Brown">Brown</option>
                    <option value="Green">Green</option>
                    <option value="White">White</option>
                    <option value="Blonde">Blonde</option>
                </select>
            </div>

            <div className="label">
                <label htmlFor="hairType">Hair Type: </label>
                <select id="hairType"
                    value={hairType}
                    onChange={(e) => setHairType(e.target.value)}>
                    <option value="">None</option>
                    <option value="Curly">Curly</option>
                    <option value="Straight">Straight</option>
                    <option value="Kinky">Kinky</option>
                    <option value="Wavy">Wavy</option>
                </select>
            </div>


        </div>
    );
}

export default Hair;