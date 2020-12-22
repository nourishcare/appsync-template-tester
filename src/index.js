"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line max-classes-per-file
const velocityjs_1 = require("velocityjs");
const utilCore = __importStar(require("./util"));
const time = __importStar(require("./util-time"));
const dynamodb = __importStar(require("./util-dynamodb"));
class Parser {
    constructor(template) {
        this.template = template;
    }
    /**
     * Resolve as a string
     */
    resolveAndRender(context, compilerConfig) {
        const clonedContext = JSON.parse(JSON.stringify(context));
        clonedContext.args = clonedContext.arguments;
        const util = {
            ...utilCore,
            time,
            dynamodb,
        };
        const params = {
            context: clonedContext,
            ctx: clonedContext,
            util,
            utils: util,
        };
        // Support the return directive added by AppSync. Note that in actual usage AppSync will ignore any previous
        // output in the template and just return the value supplied to the return directive, but this testing
        // framework will still contain the previous output since we essentially take advantage of the stop directive
        // of VTL to write this as a macro. But since any prior output is likely in error or indicative of another
        // problem in the template this will do (and doing otherwise would require hacking the AST itself, or worse
        // since the stop directive is implemented in a different manner in velocity.js).
        let macros = {
            return: function (data) {
                //if (typeof data === 'object') {
                data = JSON.stringify(data);
                //}
                return this.eval(`
#set($data = ` + data + `)
$util.toJson($data)
#stop()
                `);
            }
        };
        const res = velocityjs_1.render(this.template, params, macros, compilerConfig);
        var result;
        // Remove preceeding and trailing whitespace
        const resWithoutWhitespace = res
            .replace(/^[\n\s\r]*/, '')
            .replace(/[\n\s\r]*$/, '');
        // Typecast Booleans
        if (res === 'false')
            result = false;
        else if (res === 'true')
            result = true;
        // Typecase Null
        else if (res === 'null')
            result = null;
            // Typecase Numbers
        // eslint-disable-next-line no-restricted-globals
        else if (!isNaN(res))
            result = parseFloat(res);
        else {
            // Typecast JSON to Object
            try {
                result = JSON.parse(res);
                // eslint-disable-next-line no-empty
            }
            catch (e) {
                result = resWithoutWhitespace
            }
        }

        return {
            'result': result,
            'context': clonedContext,
        };
    }

    /**
     * Return rendered
     */
    resolve(context) {
        return this.resolveAndRender(context, {}).result;
    }
    /**
     * Return context
     */
    resolveAndGetContext(context) {
        return this.resolveAndRender(context, {}).context;
    }
    /**
     * Get Mapped Values
     */
    resolveAndGetMappedValues(context) {
        const mappedValues = [];
        this.resolveAndRender(context, {
            valueMapper: (value) => {
                mappedValues.push(value);
                return value;
            },
        });
        return mappedValues;
    }
}
exports.default = Parser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsZ0RBQWdEO0FBQ2hELDJDQUFvQztBQUNwQyxpREFBbUM7QUFDbkMsa0RBQW9DO0FBQ3BDLDBEQUE0QztBQUU1QyxNQUFxQixNQUFNO0lBR3pCLFlBQVksUUFBZ0I7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTyxDQUFDLE9BQWdCO1FBQzdCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzFELGFBQWEsQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQztRQUU3QyxNQUFNLElBQUksR0FBRztZQUNYLEdBQUcsUUFBUTtZQUNYLElBQUk7WUFDSixRQUFRO1NBQ1QsQ0FBQztRQUVGLE1BQU0sTUFBTSxHQUFHO1lBQ2IsT0FBTyxFQUFFLGFBQWE7WUFDdEIsR0FBRyxFQUFFLGFBQWE7WUFDbEIsSUFBSTtZQUNKLEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQztRQUVGLE1BQU0sR0FBRyxHQUFHLG1CQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUUxQyw0Q0FBNEM7UUFDNUMsTUFBTSxvQkFBb0IsR0FBRyxHQUFHO2FBQzdCLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDO2FBQ3pCLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFN0Isb0JBQW9CO1FBQ3BCLElBQUksR0FBRyxLQUFLLE9BQU87WUFBRSxPQUFPLEtBQUssQ0FBQztRQUNsQyxJQUFJLEdBQUcsS0FBSyxNQUFNO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFaEMsZ0JBQWdCO1FBQ2hCLElBQUksR0FBRyxLQUFLLE1BQU07WUFBRSxPQUFPLElBQUksQ0FBQztRQUVoQyxtQkFBbUI7UUFDbkIsaURBQWlEO1FBQ2pELElBQUksQ0FBQyxLQUFLLENBQUUsR0FBeUIsQ0FBQztZQUFFLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRS9ELDBCQUEwQjtRQUMxQixJQUFJO1lBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLG9DQUFvQztTQUNyQztRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7UUFFZCw0QkFBNEI7UUFDNUIsT0FBTyxvQkFBb0IsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7QUF0REQseUJBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1jbGFzc2VzLXBlci1maWxlXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICd2ZWxvY2l0eWpzJztcbmltcG9ydCAqIGFzIHV0aWxDb3JlIGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgKiBhcyB0aW1lIGZyb20gJy4vdXRpbC10aW1lJztcbmltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gJy4vdXRpbC1keW5hbW9kYic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnNlciB7XG4gIHByaXZhdGUgdGVtcGxhdGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZTogc3RyaW5nKSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmUgYXMgYSBzdHJpbmdcbiAgICovXG4gIHB1YmxpYyByZXNvbHZlKGNvbnRleHQ6IENvbnRleHQpOiBhbnkge1xuICAgIGNvbnN0IGNsb25lZENvbnRleHQgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbnRleHQpKTtcbiAgICBjbG9uZWRDb250ZXh0LmFyZ3MgPSBjbG9uZWRDb250ZXh0LmFyZ3VtZW50cztcblxuICAgIGNvbnN0IHV0aWwgPSB7XG4gICAgICAuLi51dGlsQ29yZSxcbiAgICAgIHRpbWUsXG4gICAgICBkeW5hbW9kYixcbiAgICB9O1xuXG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgY29udGV4dDogY2xvbmVkQ29udGV4dCxcbiAgICAgIGN0eDogY2xvbmVkQ29udGV4dCxcbiAgICAgIHV0aWwsXG4gICAgICB1dGlsczogdXRpbCxcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzID0gcmVuZGVyKHRoaXMudGVtcGxhdGUsIHBhcmFtcyk7XG5cbiAgICAvLyBSZW1vdmUgcHJlY2VlZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZVxuICAgIGNvbnN0IHJlc1dpdGhvdXRXaGl0ZXNwYWNlID0gcmVzXG4gICAgICAucmVwbGFjZSgvXltcXG5cXHNcXHJdKi8sICcnKVxuICAgICAgLnJlcGxhY2UoL1tcXG5cXHNcXHJdKiQvLCAnJyk7XG5cbiAgICAvLyBUeXBlY2FzdCBCb29sZWFuc1xuICAgIGlmIChyZXMgPT09ICdmYWxzZScpIHJldHVybiBmYWxzZTtcbiAgICBpZiAocmVzID09PSAndHJ1ZScpIHJldHVybiB0cnVlO1xuXG4gICAgLy8gVHlwZWNhc2UgTnVsbFxuICAgIGlmIChyZXMgPT09ICdudWxsJykgcmV0dXJuIG51bGw7XG5cbiAgICAvLyBUeXBlY2FzZSBOdW1iZXJzXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFsc1xuICAgIGlmICghaXNOYU4oKHJlcyBhcyB1bmtub3duKSBhcyBudW1iZXIpKSByZXR1cm4gcGFyc2VGbG9hdChyZXMpO1xuXG4gICAgLy8gVHlwZWNhc3QgSlNPTiB0byBPYmplY3RcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAvLyBSZXR1cm4gYSBzdHJpbmcgb3RoZXJ3aXNlXG4gICAgcmV0dXJuIHJlc1dpdGhvdXRXaGl0ZXNwYWNlO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIENvbnRleHQgPSB7XG4gIGFyZ3VtZW50cz86IE9iamVjdDtcbiAgc291cmNlPzogT2JqZWN0O1xuICByZXN1bHQ/OiBPYmplY3Q7XG4gIGlkZW50aXR5PzogT2JqZWN0O1xuICByZXF1ZXN0PzogT2JqZWN0O1xuICBpbmZvPzogT2JqZWN0O1xufTtcblxuZXhwb3J0IHR5cGUgdmVsb2NpdHlQYXJhbXMgPSB7IFtibG9ja05hbWU6IHN0cmluZ106IGJvb2xlYW4gfTtcbiJdfQ==