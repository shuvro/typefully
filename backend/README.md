## backend

This is a Django + Rest Framework backend, powered by Docker and Docker Compose. It contains a Makefile, to make common operations easier.

## Starting the backend inside Docker

1. Make sure Docker is running (if you don't have it, install [Docker desktop](https://www.docker.com/products/docker-desktop/))

2. Start the Docker containers:

```
make start
```

3. Run the migrations

```
make migrate
```

You are now good to go.

## Running tests

```bash
make test
```

## Setting up local Python environment

**This is only needed for proper code completions inside of VSCode, but recommended.**

1. Install pyenv and the right Python version:

```
brew install pyenv
pyenv install 3.10.0
```

2. Add pyenv to shell init script (eg .zshrc) so you get the right Python/Pip command version:

```
export PATH=$(pyenv root)/shims:$PATH
```

3. Set Python version to the one you just installed:

```
pyenv local 3.10.0
```

4. Open a new shell or reload the shell configuration for the above changes to take effect.

5. Create a virtual environment with venv:

```bash
cd backend
python -m venv .venv
```

6. Activate the virtual environment:

```bash
source .venv/bin/activate
```

7. Install dependencies:

```bash
pip install -r requirements.txt
```

8. Set Python interpreter in VSCode:

Get the interpreter path:

```bash
# from an activated virtual environment
which python
```

In VSCode, open the command palette using `cmd+shift+p` run command:

```
Python: Select Interpreter
```

Manually set the interpreter to the output of `which python`.

9. Success ✅ you should now get completions and linting in VSCode for Python dependencies.
