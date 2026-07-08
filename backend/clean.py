import re
import string
import nltk
from nltk.corpus import stopwords

# Download stopwords (only first time)
try:
    stop_words = set(stopwords.words("english"))
except LookupError:
    nltk.download("stopwords")
    stop_words = set(stopwords.words("english"))


# Custom stopwords
custom_words = {
    "localhost",
    "postfix",
    "esmtp",
    "fetchmail",
    "encoding",
    "utf",
    "plain",
    "text",
    "org"
}

stop_words.update(custom_words)


def clean_text(text):
    """
    Clean email text before prediction.
    """

    # Convert to string (for safety)
    text = str(text)

    # Convert to lowercase
    text = text.lower()

    # Remove URLs
    text = re.sub(r"http\S+|www\S+", " ", text)

    # Remove email addresses
    text = re.sub(r"\S+@\S+", " ", text)

    # Remove HTML tags
    text = re.sub(r"<.*?>", " ", text)

    # Remove common email headers
    text = re.sub(
        r"from|to|subject|return-path|received|message-id|date|content-type|mime-version|delivered-to|reply-to|cc|bcc|url",
        " ",
        text,
    )

    # Remove numbers
    text = re.sub(r"\d+", " ", text)

    # Remove punctuation
    text = text.translate(str.maketrans("", "", string.punctuation))

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text).strip()

    # Remove stopwords
    words = [
        word for word in text.split()
        if word not in stop_words and len(word) > 2
    ]

    return " ".join(words)