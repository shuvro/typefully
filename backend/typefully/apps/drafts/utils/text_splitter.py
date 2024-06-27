import re


def auto_split_into_meaningful_chunks(content):
    sentences = re.split(r'[.!?]', content)
    chunks = []
    current_chunk = ''
    for sentence in sentences:
        if len(current_chunk) + len(sentence) + 1 > 280:
            chunks.append(current_chunk.strip())
            current_chunk = ''
        if len(current_chunk) + len(sentence) + 1 > 280 and len(current_chunk) > 0:
            chunks.append(current_chunk.strip())
            current_chunk = ''
        current_chunk += sentence.strip() + '. '
    if current_chunk:
        chunks.append(current_chunk.strip())
    return chunks
