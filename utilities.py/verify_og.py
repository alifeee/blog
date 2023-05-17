# prints all the open-graph content for an html file

import sys
import opengraph_py3 as opengraph


def main():
    if len(sys.argv) != 2:
        print("Usage: python verify_og.py <filename>")
        sys.exit(1)
    fname = sys.argv[1]
    with open(fname, "r", encoding="utf-8") as f:
        html = f.read()
    og = opengraph.OpenGraph(html=html)
    print("\nOpen Graph items:")
    for k, v in og.items():
        print(f"{k}: {v}")


if __name__ == "__main__":
    main()
