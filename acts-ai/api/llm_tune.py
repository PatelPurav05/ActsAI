import io
import tempfile

from modal import Image, method, enter

from .common import stub

tune_image = (
    Image.debian_slim(python_version="3.10.8")  # , requirements_path=req)
    .pip_install(
            "requests==2.31.0"
    )
)

@stub.cls(
    image=tune_image,
    container_idle_timeout=300,
    timeout=180,
)
class TuneLLM:
    pass