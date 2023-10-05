function databaseDefinition() {
        /*
    	DC.list= [
            {"type": "createtable", "table": "menu", "query":  "CREATE TABLE menu (m_pk, m_typ, m_titel, m_icon, m_oberpunkt, m_aktiv, m_sichtbar, m_eingeloggt, m_reihenfolge)"}
            ,{"type": "addfield", "table": "antwort", "field": "a_richtig", "query":  "ALTER TABLE antwort ADD a_richtig"}
		];
		DC.def = {
			"menu": ["m_pk", "m_typ", "m_titel", "m_icon", "m_oberpunkt", "m_aktiv", "m_sichtbar", "m_eingeloggt", "m_reihenfolge"]
			,"content": ["c_pk", "c_menu", "c_typ", "c_inhalt", "c_datei", "c_reihenfolge"]
		};
		*/
		DC.list= [];
		DC.def = {};

		DC.list.push({"type": "createtable", "table": "localstorage", "query":  "CREATE TABLE localstorage (ls_key, ls_value)"});
		DC.def["localstorage"] = ["ls_key", "ls_value"];

	// autoinsert after this

}