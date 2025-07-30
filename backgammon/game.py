import random
from dataclasses import dataclass
from typing import List, Optional


@dataclass
class Point:
    owner: Optional[int] = None  # 1 or 2
    count: int = 0

    def __repr__(self) -> str:
        if self.count == 0:
            return "--"
        return f"{self.owner}{self.count}"


class BackgammonGame:
    """A minimal yet playable text-based backgammon implementation."""

    START_POSITIONS = {
        1: {23: 2, 12: 5, 7: 3, 5: 5},
        2: {0: 2, 11: 5, 16: 3, 18: 5},
    }

    def __init__(self) -> None:
        self.points: List[Point] = [Point() for _ in range(24)]
        self.bar = {1: 0, 2: 0}
        self.off = {1: 0, 2: 0}
        self.turn = 1
        self.setup()

    def setup(self) -> None:
        for p in range(24):
            self.points[p] = Point()
        for player, positions in self.START_POSITIONS.items():
            for idx, count in positions.items():
                self.points[idx] = Point(player, count)

    def roll_dice(self) -> List[int]:
        d1, d2 = random.randint(1, 6), random.randint(1, 6)
        return [d1] * 4 if d1 == d2 else [d1, d2]

    def direction(self, player: int) -> int:
        return -1 if player == 1 else 1

    def home_board(self, player: int) -> range:
        return range(18, 24) if player == 1 else range(0, 6)

    def opponent(self, player: int) -> int:
        return 2 if player == 1 else 1

    def print_board(self) -> None:
        top_numbers = " ".join(f"{23 - i:2}" for i in range(12))
        bottom_numbers = " ".join(f"{i:2}" for i in range(12))
        top_points = " ".join(f"{self.points[23 - i]}".ljust(4) for i in range(12))
        bottom_points = " ".join(f"{self.points[i]}".ljust(4) for i in range(12))
        print(top_numbers)
        print(top_points)
        print("-" * 48)
        print(bottom_points)
        print(bottom_numbers)
        print()
        print(f"Bar: P1={self.bar[1]} P2={self.bar[2]}  Off: P1={self.off[1]} P2={self.off[2]}")
        print()

    def is_point_blocked(self, player: int, idx: int) -> bool:
        point = self.points[idx]
        return point.owner not in (None, player) and point.count >= 2

    def enter_from_bar(self, player: int, die: int) -> bool:
        if self.bar[player] == 0:
            return False
        dir_ = self.direction(player)
        if player == 1:
            idx = 24 - die
        else:
            idx = die - 1
        if self.is_point_blocked(player, idx):
            return False
        self.bar[player] -= 1
        self.land_checker(player, idx)
        return True

    def land_checker(self, player: int, idx: int) -> None:
        point = self.points[idx]
        if point.owner and point.owner != player and point.count == 1:
            self.bar[point.owner] += 1
            point.owner = player
            point.count = 1
        else:
            if point.owner is None:
                point.owner = player
            point.count += 1

    def remove_checker(self, idx: int) -> None:
        point = self.points[idx]
        point.count -= 1
        if point.count == 0:
            point.owner = None

    def can_bear_off(self, player: int) -> bool:
        hb = self.home_board(player)
        for idx, p in enumerate(self.points):
            if p.owner == player and idx not in hb:
                return False
        return True

    def bear_off(self, player: int, idx: int, die: int) -> bool:
        if not self.can_bear_off(player):
            return False
        dir_ = self.direction(player)
        target = idx + dir_ * die
        if player == 1 and target < 0:
            target = -1
        if player == 2 and target > 23:
            target = 24
        if (player == 1 and idx < die) or (player == 2 and 23 - idx < die - 1):
            # allow exact or higher if no piece behind
            furthest = max(i for i in self.home_board(player) if self.points[i].owner == player)
            if idx != furthest:
                return False
        if target not in (-1, 24):
            return False
        self.remove_checker(idx)
        self.off[player] += 1
        return True

    def move_checker(self, player: int, idx: int, die: int) -> bool:
        dir_ = self.direction(player)
        dest = idx + dir_ * die
        if dest < 0 or dest > 23:
            return self.bear_off(player, idx, die)
        if self.is_point_blocked(player, dest):
            return False
        self.remove_checker(idx)
        self.land_checker(player, dest)
        return True

    def available_moves(self, player: int, die: int) -> List[int]:
        moves = []
        if self.bar[player] > 0:
            if self.enter_from_bar(player, die):
                self.undo_move(player, die, "bar")  # undo; just checking availability
                moves.append("bar")
            return moves
        for i, p in enumerate(self.points):
            if p.owner == player:
                dest = i + self.direction(player) * die
                if dest < 0 or dest > 23:
                    if self.can_bear_off(player):
                        if self.bear_off(player, i, die):
                            self.undo_move(player, die, i, dest)
                            moves.append(i)
                elif not self.is_point_blocked(player, dest):
                    moves.append(i)
        return moves

    def undo_move(self, player: int, die: int, start, dest=None) -> None:
        """Utility for availability checks - reverses a temporary move."""
        if start == "bar":
            self.bar[player] += 1
        else:
            self.land_checker(player, start)
        if dest is not None:
            if dest in (-1, 24):
                self.off[player] -= 1
            else:
                point = self.points[dest]
                if point.owner != player and point.count == 0:
                    self.bar[self.opponent(player)] -= 1
                    self.points[dest] = Point(None, 0)
                else:
                    self.remove_checker(dest)

    def take_turn(self) -> None:
        dice = self.roll_dice()
        print(f"Player {self.turn} rolled {dice}")
        for die in dice:
            self.print_board()
            moved = False
            while not moved:
                if self.bar[self.turn] > 0:
                    prompt = f"enter from bar using {die} (y/n)? "
                    ans = input(prompt).strip().lower()
                    if ans == "y":
                        if self.enter_from_bar(self.turn, die):
                            moved = True
                        else:
                            print("Cannot enter from bar with that die.")
                            return
                        continue
                start = input(f"move using {die} from point (or pass): ").strip()
                if start.lower() == "pass":
                    break
                try:
                    idx = int(start)
                except ValueError:
                    print("Invalid input")
                    continue
                if idx < 0 or idx > 23:
                    print("Point out of range")
                    continue
                if self.points[idx].owner != self.turn:
                    print("No checker there")
                    continue
                if self.move_checker(self.turn, idx, die):
                    moved = True
                else:
                    print("Illegal move")
            self.print_board()
        self.turn = self.opponent(self.turn)

    def is_game_over(self) -> Optional[int]:
        for player in (1, 2):
            if self.off[player] >= 15:
                return player
        return None

    def play(self) -> None:
        while not (winner := self.is_game_over()):
            self.take_turn()
        print(f"Player {winner} wins!")


if __name__ == "__main__":
    BackgammonGame().play()
