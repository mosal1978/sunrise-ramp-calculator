import random

class Point:
    def __init__(self, owner=None, count=0):
        self.owner = owner  # 1 or 2
        self.count = count

    def __repr__(self):
        if self.count == 0:
            return "--"
        return f"{self.owner}{self.count}"


class BackgammonGame:
    """A very small text-based backgammon implementation."""

    def __init__(self):
        # 24 points on the board
        self.points = [Point() for _ in range(24)]
        self.bar = {1: 0, 2: 0}
        self.off = {1: 0, 2: 0}
        self.turn = 1
        self.setup()

    def setup(self):
        """Set up the standard backgammon starting position."""
        # Player 1 moves from point 0 -> 23
        # Player 2 moves from 23 -> 0
        self.points[0] = Point(2, 2)
        self.points[11] = Point(2, 5)
        self.points[16] = Point(2, 3)
        self.points[18] = Point(2, 5)

        self.points[23] = Point(1, 2)
        self.points[12] = Point(1, 5)
        self.points[7] = Point(1, 3)
        self.points[5] = Point(1, 5)

    def roll(self):
        return random.randint(1, 6), random.randint(1, 6)

    def print_board(self):
        top = " ".join(f"{23-i:2}" for i in range(12))
        bottom = " ".join(f"{i+12:2}" for i in range(12))
        pts_top = " ".join(f"{self.points[23-i]}".ljust(3) for i in range(12))
        pts_bottom = " ".join(f"{self.points[i+12]}".ljust(3) for i in range(12))
        print(top)
        print(pts_top)
        print("-" * 36)
        print(pts_bottom)
        print(bottom)
        print()

    def move_checker(self, player, start, end):
        pt_start = self.points[start]
        pt_end = self.points[end]

        if pt_start.owner != player or pt_start.count == 0:
            raise ValueError("No checker at start point")

        direction = 1 if player == 1 else -1
        if end != start + direction:
            raise ValueError("Only simple moves supported in this demo")

        # Hit opponent if single
        if pt_end.owner and pt_end.owner != player and pt_end.count == 1:
            self.bar[pt_end.owner] += 1
            pt_end.owner = player
            pt_end.count = 1
        elif pt_end.owner and pt_end.owner != player:
            raise ValueError("Point blocked")
        else:
            if pt_end.owner is None:
                pt_end.owner = player
            pt_end.count += 1
        # Remove checker from start
        pt_start.count -= 1
        if pt_start.count == 0:
            pt_start.owner = None

    def take_turn(self):
        dice = self.roll()
        print(f"Player {self.turn} rolled {dice}")
        for _ in dice:
            self.print_board()
            move = input("move start-end or pass: ")
            if move.strip().lower() == "pass":
                continue
            try:
                start_s, end_s = move.strip().split("-")
                start = int(start_s)
                end = int(end_s)
                self.move_checker(self.turn, start, end)
            except Exception as e:
                print(f"Invalid move: {e}")
        self.turn = 2 if self.turn == 1 else 1

    def play(self):
        while self.off[1] < 15 and self.off[2] < 15:
            self.take_turn()
        print("Game over")


if __name__ == "__main__":
    game = BackgammonGame()
    game.play()
