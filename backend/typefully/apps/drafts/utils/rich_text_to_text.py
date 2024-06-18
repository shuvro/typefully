def rich_text_to_text(doc: dict) -> str:
    res = ""

    print(doc)

    for atom_node in doc.get("content", []):
        if atom_node["type"] == "atom":
            for paragraph_node in atom_node.get("content", []):
                if paragraph_node["type"] == "paragraph":
                    for inner_node in paragraph_node.get("content", []):
                        if inner_node["type"] == "text":
                            res += inner_node["text"]
                        else:
                            print(f"Unknown node type: {inner_node['type']}")
                            continue

                    res += "\n"
                else:
                    print(f"Unknown node type: {paragraph_node['type']}")
                    continue
        else:
            print(f"Unknown node type: {atom_node['type']}")
            continue

    return res
