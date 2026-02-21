import 'package:dart_simple_project/greet.dart';

void main(List<String> arguments) {
  final message = greet(arguments.isNotEmpty ? arguments.first : 'World');
  print(message);
}
