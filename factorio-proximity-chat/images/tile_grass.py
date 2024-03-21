"""get tilesheet and make a randomly tiled image of grass tiles
to use: use CLI.
I like this image

py .\tile_grass.py .\grass-tilesheet.png .\grass-tiled.jpg --random-weights 100 100 100 1 1 1 1 1 1 1 1 1 1 1 1 1 --output-tiles-width 15 --output-tiles-height 15 --seed 72
"""
import argparse
import random
from PIL import Image


def pick_random_tile(tiles, random_weights):
    """pick a random tile"""
    if random_weights is None:
        return random.choice(tiles)
    else:
        return random.choices(tiles, weights=random_weights, k=1)[0]


def main(
    input_fname,
    output_fname,
    tile_width,
    tile_height,
    seed,
    output_tiles_width,
    output_tiles_height,
    random_weights,
):
    """main"""
    tileset = Image.open(input_fname)
    tileset_width_px, tileset_height_px = tileset.size
    tileset_width_n = tileset_width_px // tile_width
    tileset_height_n = tileset_height_px // tile_height

    tiles = []
    for y in range(tileset_height_n):
        for x in range(tileset_width_n):
            tile = tileset.crop(
                (
                    x * tile_width,
                    y * tile_height,
                    (x + 1) * tile_width,
                    (y + 1) * tile_height,
                )
            )
            tiles.append(tile)

    random.seed(seed)
    output_width_px = output_tiles_width * tile_width
    output_height_px = output_tiles_height * tile_height
    output = Image.new("RGB", (output_width_px, output_height_px))
    for y in range(output_tiles_height):
        for x in range(output_tiles_width):
            tile = pick_random_tile(tiles, random_weights)
            output.paste(
                tile,
                (
                    x * tile_width,
                    y * tile_height,
                    (x + 1) * tile_width,
                    (y + 1) * tile_height,
                ),
            )

    # save jpg
    output.save(
        output_fname,
        format="JPEG",
        optimize=True,
    )
    print("saved to", output_fname)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("input_fname")
    parser.add_argument("output_fname")

    parser.add_argument("--tile-width", type=int, default=128)
    parser.add_argument("--tile-height", type=int, default=128)

    parser.add_argument("--seed", type=int, default=456454)

    parser.add_argument("--output-tiles-width", type=int, default=5)
    parser.add_argument("--output-tiles-height", type=int, default=5)

    parser.add_argument("--random-weights", type=int, nargs="+", default=None)

    args = parser.parse_args()
    main(
        args.input_fname,
        args.output_fname,
        args.tile_width,
        args.tile_height,
        args.seed,
        args.output_tiles_width,
        args.output_tiles_height,
        args.random_weights,
    )
