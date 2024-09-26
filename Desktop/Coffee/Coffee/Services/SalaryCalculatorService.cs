using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coffee.Services
{
    public class SalaryCalculatorService
    {
        public abstract class SalaryCalculator
        {
            public abstract decimal CalculateSalary(int employeeId, DateTime month);
        }

        public class BaseSalaryCalculator : SalaryCalculator
        {
            public override decimal CalculateSalary(int employeeId, DateTime month)
            {
                // Lấy lương cơ bản từ chức vụ (tính theo ngày)

                // Lấy số làn chấm công trong tháng

                // Lương sẽ bằng lương cơ bản * cho số ngày chấm công

                return 0;
            }
        }

        public abstract class SalaryDecorator : SalaryCalculator
        {
            protected SalaryCalculator _baseCalculator;

            protected SalaryDecorator(SalaryCalculator baseCalculator)
            {
                _baseCalculator = baseCalculator;
            }
        }

        public class RewardSalaryDecorator : SalaryDecorator
        {
            public RewardSalaryDecorator(SalaryCalculator baseCalculator)
                : base(baseCalculator)
            {
            }

            public override decimal CalculateSalary(int employeeId, DateTime month)
            {
                var salary = _baseCalculator.CalculateSalary(employeeId, month);

                // tính ra lương thưởng rồi cộng vào

                return salary;
            }
        }

        public class PenaltySalaryDecorator : SalaryDecorator
        {
            public PenaltySalaryDecorator(SalaryCalculator baseCalculator)
                : base(baseCalculator)
            {
            }

            public override decimal CalculateSalary(int employeeId, DateTime month)
            {
                var salary = _baseCalculator.CalculateSalary(employeeId, month);

                // tính ra lương phạt rồi trừ đi

                return salary;
            }
        }


    }
}
