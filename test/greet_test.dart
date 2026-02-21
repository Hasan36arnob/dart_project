import 'package:test/test.dart';
import 'package:dart_simple_project/greet.dart';

void main() {
  test('greet returns a friendly message', () {
    expect(greet('World'), equals('Hello, World!'));
  });
}
