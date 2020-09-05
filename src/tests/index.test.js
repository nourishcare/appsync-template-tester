"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
test('Simple vtl returns correctly', () => {
    const vtl = '$utils.toJson({"test": true})';
    const parser = new index_1.default(vtl);
    const result = parser.resolve({});
    expect(result).toEqual({ test: true });
});
// This is a directive added by AppSync. It stops execution of the current request template and will skip any call to
// an external service and skip to the response template, resolving to the data supplied to the directive.
test('Return directive stops execution and returns value for integer', () => {
    const vtl = `
#set($a = 1)
#return(93)
$a
`;
    const parser = new index_1.default(vtl);
    const result = parser.resolve({});
    expect(result).toEqual(93);
});
test('Return directive stops execution and returns value for string', () => {
    const vtl = `
#set($a = 1)
#return('hello')
$a
`;
    const parser = new index_1.default(vtl);
    const result = parser.resolve({});
    expect(result).toEqual('hello');
});
test('Return directive stops execution and returns value for array', () => {
    const vtl = `
#set($a = 1)
#return(['hello'])
$a
`;
    const parser = new index_1.default(vtl);
    const result = parser.resolve({});
    expect(result).toEqual(['hello']);
});
test('Return directive stops execution and returns value for object', () => {
    const vtl = `
#set($a = 1)
#return({'hello': 'world', 'goodbye': 0})
$a
`;
    const parser = new index_1.default(vtl);
    const result = parser.resolve({});
    expect(result).toEqual({'hello': 'world', 'goodbye': 0});
});
test('util.qr hides result', () => {
    const vtl = `
  #set($array = [])
  $util.qr($array.add(1))
  {"test": $array}`;
    const parser = new index_1.default(vtl);
    const res = parser.resolve({});
    expect(res).toEqual({ test: [1] });
    // expect(res.includes('$util.qr($array.add("element in array"))')).toBeFalsy();
});
test('util.quiet hides result', () => {
    const vtl = `
  #set($array = [])
  $util.quiet($array.add(1))
  {"test": $array}`;
    const parser = new index_1.default(vtl);
    const res = parser.resolve({});
    expect(res).toEqual({ test: [1] });
});
describe('Typecasting works as expected', () => {
    test('Boolean false', () => {
        const vtl = '\nfalse '; // Note surrounding whitespace should be ignored
        const parser = new index_1.default(vtl);
        const res = parser.resolve({});
        expect(res).toBe(false);
    });
    test('Boolean true', () => {
        const vtl = 'true';
        const parser = new index_1.default(vtl);
        const res = parser.resolve({});
        expect(res).toBe(true);
    });
    test('Null', () => {
        const vtl = 'null';
        const parser = new index_1.default(vtl);
        const res = parser.resolve({});
        expect(res).toBe(null);
    });
    test('Integer', () => {
        const vtl = '123';
        const parser = new index_1.default(vtl);
        const res = parser.resolve({});
        expect(res).toBe(123);
    });
    test('Float', () => {
        const vtl = '123.456';
        const parser = new index_1.default(vtl);
        const res = parser.resolve({});
        expect(res).toBe(123.456);
    });
    test('JSON', () => {
        const vtl = '{"test": true}';
        const parser = new index_1.default(vtl);
        const res = parser.resolve({});
        expect(res).toEqual({ test: true });
    });
    test('Array', () => {
        const vtl = '[1,2,3]';
        const parser = new index_1.default(vtl);
        const res = parser.resolve({});
        expect(res).toEqual([1, 2, 3]);
    });
    test('String', () => {
        const vtl = 'abc123';
        const parser = new index_1.default(vtl);
        const res = parser.resolve({});
        expect(res).toBe('abc123');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9pbmRleC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscURBQThCO0FBRTlCLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLEVBQUU7SUFDeEMsTUFBTSxHQUFHLEdBQUcsK0JBQStCLENBQUM7SUFDNUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO0lBQ2hDLE1BQU0sR0FBRyxHQUFHOzs7bUJBR0ssQ0FBQztJQUNsQixNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkMsZ0ZBQWdGO0FBQ2xGLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRTtJQUNuQyxNQUFNLEdBQUcsR0FBRzs7O21CQUdLLENBQUM7SUFDbEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQixNQUFNLENB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QUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1FBQ2xCLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUNyQixNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJzZXIgZnJvbSAnLi4vaW5kZXgnO1xuXG50ZXN0KCdTaW1wbGUgdnRsIHJldHVybnMgY29ycmVjdGx5JywgKCkgPT4ge1xuICBjb25zdCB2dGwgPSAnJHV0aWxzLnRvSnNvbih7XCJ0ZXN0XCI6IHRydWV9KSc7XG4gIGNvbnN0IHBhcnNlciA9IG5ldyBQYXJzZXIodnRsKTtcbiAgY29uc3QgcmVzdWx0ID0gcGFyc2VyLnJlc29sdmUoe30pO1xuICBleHBlY3QocmVzdWx0KS50b0VxdWFsKHsgdGVzdDogdHJ1ZSB9KTtcbn0pO1xuXG50ZXN0KCd1dGlsLnFyIGhpZGVzIHJlc3VsdCcsICgpID0+IHtcbiAgY29uc3QgdnRsID0gYFxuICAjc2V0KCRhcnJheSA9IFtdKVxuICAkdXRpbC5xcigkYXJyYXkuYWRkKDEpKVxuICB7XCJ0ZXN0XCI6ICRhcnJheX1gO1xuICBjb25zdCBwYXJzZXIgPSBuZXcgUGFyc2VyKHZ0bCk7XG4gIGNvbnN0IHJlcyA9IHBhcnNlci5yZXNvbHZlKHt9KTtcbiAgZXhwZWN0KHJlcykudG9FcXVhbCh7IHRlc3Q6IFsxXSB9KTtcbiAgLy8gZXhwZWN0KHJlcy5pbmNsdWRlcygnJHV0aWwucXIoJGFycmF5LmFkZChcImVsZW1lbnQgaW4gYXJyYXlcIikpJykpLnRvQmVGYWxzeSgpO1xufSk7XG5cbnRlc3QoJ3V0aWwucXVpZXQgaGlkZXMgcmVzdWx0JywgKCkgPT4ge1xuICBjb25zdCB2dGwgPSBgXG4gICNzZXQoJGFycmF5ID0gW10pXG4gICR1dGlsLnF1aWV0KCRhcnJheS5hZGQoMSkpXG4gIHtcInRlc3RcIjogJGFycmF5fWA7XG4gIGNvbnN0IHBhcnNlciA9IG5ldyBQYXJzZXIodnRsKTtcbiAgY29uc3QgcmVzID0gcGFyc2VyLnJlc29sdmUoe30pO1xuICBleHBlY3QocmVzKS50b0VxdWFsKHsgdGVzdDogWzFdIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdUeXBlY2FzdGluZyB3b3JrcyBhcyBleHBlY3RlZCcsICgpID0+IHtcbiAgdGVzdCgnQm9vbGVhbiBmYWxzZScsICgpID0+IHtcbiAgICBjb25zdCB2dGwgPSAnXFxuZmFsc2UgJzsgLy8gTm90ZSBzdXJyb3VuZGluZyB3aGl0ZXNwYWNlIHNob3VsZCBiZSBpZ25vcmVkXG4gICAgY29uc3QgcGFyc2VyID0gbmV3IFBhcnNlcih2dGwpO1xuICAgIGNvbnN0IHJlcyA9IHBhcnNlci5yZXNvbHZlKHt9KTtcbiAgICBleHBlY3QocmVzKS50b0JlKGZhbHNlKTtcbiAgfSk7XG5cbiAgdGVzdCgnQm9vbGVhbiB0cnVlJywgKCkgPT4ge1xuICAgIGNvbnN0IHZ0bCA9ICd0cnVlJztcbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgUGFyc2VyKHZ0bCk7XG4gICAgY29uc3QgcmVzID0gcGFyc2VyLnJlc29sdmUoe30pO1xuICAgIGV4cGVjdChyZXMpLnRvQmUodHJ1ZSk7XG4gIH0pO1xuXG4gIHRlc3QoJ051bGwnLCAoKSA9PiB7XG4gICAgY29uc3QgdnRsID0gJ251bGwnO1xuICAgIGNvbnN0IHBhcnNlciA9IG5ldyBQYXJzZXIodnRsKTtcbiAgICBjb25zdCByZXMgPSBwYXJzZXIucmVzb2x2ZSh7fSk7XG4gICAgZXhwZWN0KHJlcykudG9CZShudWxsKTtcbiAgfSk7XG5cbiAgdGVzdCgnSW50ZWdlcicsICgpID0+IHtcbiAgICBjb25zdCB2dGwgPSAnMTIzJztcbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgUGFyc2VyKHZ0bCk7XG4gICAgY29uc3QgcmVzID0gcGFyc2VyLnJlc29sdmUoe30pO1xuICAgIGV4cGVjdChyZXMpLnRvQmUoMTIzKTtcbiAgfSk7XG5cbiAgdGVzdCgnRmxvYXQnLCAoKSA9PiB7XG4gICAgY29uc3QgdnRsID0gJzEyMy40NTYnO1xuICAgIGNvbnN0IHBhcnNlciA9IG5ldyBQYXJzZXIodnRsKTtcbiAgICBjb25zdCByZXMgPSBwYXJzZXIucmVzb2x2ZSh7fSk7XG4gICAgZXhwZWN0KHJlcykudG9CZSgxMjMuNDU2KTtcbiAgfSk7XG5cbiAgdGVzdCgnSlNPTicsICgpID0+IHtcbiAgICBjb25zdCB2dGwgPSAne1widGVzdFwiOiB0cnVlfSc7XG4gICAgY29uc3QgcGFyc2VyID0gbmV3IFBhcnNlcih2dGwpO1xuICAgIGNvbnN0IHJlcyA9IHBhcnNlci5yZXNvbHZlKHt9KTtcbiAgICBleHBlY3QocmVzKS50b0VxdWFsKHsgdGVzdDogdHJ1ZSB9KTtcbiAgfSk7XG5cbiAgdGVzdCgnQXJyYXknLCAoKSA9PiB7XG4gICAgY29uc3QgdnRsID0gJ1sxLDIsM10nO1xuICAgIGNvbnN0IHBhcnNlciA9IG5ldyBQYXJzZXIodnRsKTtcbiAgICBjb25zdCByZXMgPSBwYXJzZXIucmVzb2x2ZSh7fSk7XG4gICAgZXhwZWN0KHJlcykudG9FcXVhbChbMSwgMiwgM10pO1xuICB9KTtcblxuICB0ZXN0KCdTdHJpbmcnLCAoKSA9PiB7XG4gICAgY29uc3QgdnRsID0gJ2FiYzEyMyc7XG4gICAgY29uc3QgcGFyc2VyID0gbmV3IFBhcnNlcih2dGwpO1xuICAgIGNvbnN0IHJlcyA9IHBhcnNlci5yZXNvbHZlKHt9KTtcbiAgICBleHBlY3QocmVzKS50b0JlKCdhYmMxMjMnKTtcbiAgfSk7XG59KTtcbiJdfQ==